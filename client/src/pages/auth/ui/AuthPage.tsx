import { Container } from '@mantine/core'
import { AuthForm } from '@/features/auth'

export const AuthPage = () => (
  <Container size={420} py={80}>
    <AuthForm />
  </Container>
)
