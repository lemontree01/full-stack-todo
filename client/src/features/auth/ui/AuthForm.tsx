import { Alert, Anchor, Button, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useState, type FormEvent } from 'react'
import { useLogin, useRegister } from '../api/authMutations'

export const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false)
  const login = useLogin()
  const register = useRegister()
  const mutation = isRegister ? register : login

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    mutation.mutate({ login: String(form.get('login')), password: String(form.get('password')) })
  }

  const switchMode = () => {
    login.reset()
    register.reset()
    setIsRegister(!isRegister)
  }

  return (
    <Paper withBorder shadow="sm" p="xl" radius="lg">
      <form onSubmit={onSubmit}>
        <Stack>
          <div>
            <Title order={2}>{isRegister ? 'Create an account' : 'Welcome back'}</Title>
            <Text c="dimmed" size="sm">
              {isRegister ? 'Sign up to start organizing your tasks' : 'Sign in to see your tasks'}
            </Text>
          </div>

          <TextInput name="login" label="Login" autoComplete="username" required minLength={3} maxLength={32} />
          <PasswordInput
            name="password"
            label="Password"
            description={isRegister ? 'At least 8 characters' : undefined}
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            required
            minLength={isRegister ? 8 : undefined}
            maxLength={72}
          />

          {mutation.error && (
            <Alert color="red" variant="light" icon={<IconAlertCircle />}>
              {mutation.error.message}
            </Alert>
          )}

          <Button type="submit" loading={mutation.isPending} fullWidth>
            {isRegister ? 'Sign up' : 'Sign in'}
          </Button>

          <Text size="sm" ta="center">
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
            <Anchor component="button" type="button" onClick={switchMode}>
              {isRegister ? 'Sign in' : 'Sign up'}
            </Anchor>
          </Text>
        </Stack>
      </form>
    </Paper>
  )
}
