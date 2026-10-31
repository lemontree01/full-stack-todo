// End-to-end API tests against the database in DATABASE_URL (see docker-compose.yml).
import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { once } from 'node:events'
import type { AddressInfo } from 'node:net'
import { after, test } from 'node:test'
import app from './main/app.js'

const server = app.listen(0)
await once(server, 'listening')
after(() => server.close())
const base = `http://localhost:${(server.address() as AddressInfo).port}/api`

const PASSWORD = 'correct-horse'
const uniqueLogin = (prefix: string) => `${prefix}_${randomUUID().slice(0, 8)}`

/** A tiny HTTP client with its own cookie jar, i.e. one browser. */
const client = () => {
  let cookie = ''
  return async (method: string, path: string, body?: unknown) => {
    const res = await fetch(base + path, {
      method,
      headers: { 'content-type': 'application/json', cookie },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    cookie = res.headers.get('set-cookie')?.split(';')[0] ?? cookie
    const text = await res.text()
    return { status: res.status, body: text ? JSON.parse(text) : undefined }
  }
}

const signedIn = async (prefix: string) => {
  const api = client()
  assert.equal((await api('POST', '/auth/register', { login: uniqueLogin(prefix), password: PASSWORD })).status, 201)
  return api
}

test('register → me → logout → login', async () => {
  const api = client()
  const login = uniqueLogin('alice')

  assert.equal((await api('POST', '/auth/register', { login, password: PASSWORD })).status, 201)
  assert.deepEqual((await api('GET', '/auth/me')).body, { login })
  assert.equal((await api('POST', '/auth/register', { login, password: PASSWORD })).status, 409)

  assert.equal((await api('POST', '/auth/logout')).status, 204)
  assert.equal((await api('GET', '/auth/me')).status, 401)

  const wrongPassword = await api('POST', '/auth/login', { login, password: 'wrong-password' })
  const unknownLogin = await api('POST', '/auth/login', { login: uniqueLogin('nobody'), password: PASSWORD })
  assert.equal(wrongPassword.status, 401)
  assert.deepEqual(wrongPassword.body, unknownLogin.body, 'responses must not reveal which logins exist')

  assert.equal((await api('POST', '/auth/login', { login: login.toUpperCase(), password: PASSWORD })).status, 200)
  assert.deepEqual((await api('GET', '/auth/me')).body, { login })
})

test('todos require a session', async () => {
  assert.equal((await client()('GET', '/todos')).status, 401)
})

test('invalid input is rejected with 400', async () => {
  const anon = client()
  assert.equal((await anon('POST', '/auth/login', { login: { $ne: null }, password: PASSWORD })).status, 400)
  assert.equal((await anon('POST', '/auth/register', { login: uniqueLogin('short'), password: '123' })).status, 400)

  const api = await signedIn('val')
  assert.equal((await api('POST', '/todos', { name: '   ' })).status, 400)
  assert.equal((await api('POST', '/todos', { name: 'x'.repeat(501) })).status, 400)
  assert.equal((await api('PATCH', '/todos/abc', { isDone: true })).status, 400)
  assert.equal((await api('PATCH', '/todos/1', {})).status, 400)
})

test('todo CRUD', async () => {
  const api = await signedIn('crud')
  const { status, body: todo } = await api('POST', '/todos', { name: '  Buy milk  ' })
  assert.equal(status, 201)
  assert.equal(todo.name, 'Buy milk')
  assert.equal(todo.isDone, false)

  assert.equal((await api('PATCH', `/todos/${todo.id}`, { name: 'Buy oat milk', isDone: true })).body.isDone, true)
  assert.deepEqual(
    (await api('GET', '/todos')).body.map((t: { name: string }) => t.name),
    ['Buy oat milk'],
  )
  assert.equal((await api('DELETE', `/todos/${todo.id}`)).status, 204)
  assert.deepEqual((await api('GET', '/todos')).body, [])
})

test("users can't see or change each other's todos", async () => {
  const alice = await signedIn('alice')
  const bob = await signedIn('bob')
  const { body: todo } = await alice('POST', '/todos', { name: "Alice's secret" })

  assert.deepEqual((await bob('GET', '/todos')).body, [])
  assert.equal((await bob('PATCH', `/todos/${todo.id}`, { name: 'hacked' })).status, 404)
  assert.equal((await bob('DELETE', `/todos/${todo.id}`)).status, 404)

  const [aliceTodo] = (await alice('GET', '/todos')).body
  assert.equal(aliceTodo.name, "Alice's secret")
})
