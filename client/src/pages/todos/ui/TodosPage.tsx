import { Container, Stack, Title } from '@mantine/core'
import { CreateTodoForm } from '@/features/todo-create'
import { TodoList } from '@/widgets/todo-list'

export const TodosPage = () => (
  <Container size="sm" py="xl">
    <Stack>
      <Title order={2}>My tasks</Title>
      <CreateTodoForm />
      <TodoList />
    </Stack>
  </Container>
)
