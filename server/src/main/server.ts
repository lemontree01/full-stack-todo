import app from './app.js'

const port = Number(process.env.PORT ?? 4000)
// Express 5 passes bind errors (e.g. port in use) to this callback instead of throwing.
app.listen(port, (error) => {
  if (error) throw error
  console.log(`API listening on http://localhost:${port}`)
})
