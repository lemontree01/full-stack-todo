import { Alert, AppShell, Center, Container, Loader } from '@mantine/core'
import { useSession } from '@/entities/session'
import { AuthPage } from '@/pages/auth'
import { TodosPage } from '@/pages/todos'
import { Header } from '@/widgets/header'

const Content = () => {
  const session = useSession()

  if (session.isPending) {
    return (
      <Center h="50vh">
        <Loader />
      </Center>
    )
  }

  if (session.error) {
    return (
      <Container size="sm" py="xl">
        <Alert color="red" variant="light" title="Can't reach the server">
          Please try again in a moment.
        </Alert>
      </Container>
    )
  }

  return session.data ? <TodosPage /> : <AuthPage />
}

export const App = () => (
  <AppShell header={{ height: 60 }}>
    <AppShell.Header>
      <Header />
    </AppShell.Header>
    <AppShell.Main>
      <Content />
    </AppShell.Main>
  </AppShell>
)
