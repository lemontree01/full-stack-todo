import { Alert, Anchor, EmptyState, Skeleton, Stack, Text } from '@mantine/core'
import { IconChecklist } from '@tabler/icons-react'
import { useTodos } from '@/entities/todo'
import { TodoRow } from './TodoRow'

export const TodoList = () => {
  const { data: todos, isPending, error, refetch } = useTodos()

  if (isPending) {
    return (
      <Stack gap="xs">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} h={52} radius="md" />
        ))}
      </Stack>
    )
  }

  if (error) {
    return (
      <Alert color="red" variant="light" title="Couldn't load your todos">
        {error.message}.{' '}
        <Anchor component="button" onClick={() => refetch()}>
          Try again
        </Anchor>
      </Alert>
    )
  }

  if (todos.length === 0) {
    return (
      <EmptyState
        mt="xl"
        icon={<IconChecklist />}
        title="Nothing to do yet"
        description="Add your first task above."
      />
    )
  }

  const left = todos.filter((t) => !t.isDone).length

  return (
    <Stack gap="xs">
      <Text size="sm" c="dimmed">
        {left === 0 ? 'All done!' : `${left} of ${todos.length} left`}
      </Text>
      {todos.map((todo) => (
        <TodoRow key={todo.id} todo={todo} />
      ))}
    </Stack>
  )
}
