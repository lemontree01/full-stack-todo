import { Alert, Container, Stack, Title } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'
import { useSession } from '@/entities/session'
import { CreateTodoForm } from '@/features/todo-create'
import { TodoList } from '@/widgets/todo-list'

export const TodosPage = () => {
  const { data: user } = useSession()

  return (
    <Container size="sm" py="xl">
      <Stack>
        <Title order={2}>My tasks</Title>
        {user?.isGuest && (
          <Alert variant="light" icon={<IconInfoCircle />}>
            You're using a guest account, so your tasks live in this browser. Sign up to keep them and use them on
            any device.
          </Alert>
        )}
        <CreateTodoForm />
        <TodoList />
      </Stack>
    </Container>
  )
}
