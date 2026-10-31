import { Alert, Anchor, Button, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconAlertCircle } from '@tabler/icons-react'
import { useState, type FormEvent } from 'react'
import { useSession } from '@/entities/session'
import { useLogin, useRegister } from '../api/authMutations'

export type AuthMode = 'login' | 'register'

interface AuthFormProps {
  initialMode: AuthMode
  onSuccess: () => void
}

export const AuthForm = ({ initialMode, onSuccess }: AuthFormProps) => {
  const [isRegister, setIsRegister] = useState(initialMode === 'register')
  const { data: user } = useSession()
  const login = useLogin()
  const register = useRegister()
  const mutation = isRegister ? register : login

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    mutation.mutate({ login: String(form.get('login')), password: String(form.get('password')) }, { onSuccess })
  }

  const switchMode = () => {
    login.reset()
    register.reset()
    setIsRegister(!isRegister)
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <div>
          <Title order={2}>{isRegister ? 'Create an account' : 'Welcome back'}</Title>
          <Text c="dimmed" size="sm">
            {isRegister
              ? user?.isGuest
                ? 'Your current tasks will be saved to your new account'
                : 'Sign up to keep your tasks on any device'
              : 'Sign in to see your tasks'}
          </Text>
        </div>

        <TextInput
          name="login"
          label="Login"
          autoComplete="username"
          required
          minLength={3}
          maxLength={32}
          data-autofocus
        />
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
  )
}
