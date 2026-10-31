import { Checkbox } from '@mantine/core'
import type { Todo } from '@/entities/todo'
import { useToggleTodo } from '../api/useToggleTodo'

export const ToggleTodoCheckbox = ({ todo }: { todo: Todo }) => {
  const toggle = useToggleTodo()
  // While the request is in flight, show the state the user asked for.
  const checked = toggle.isPending ? toggle.variables.isDone : todo.isDone

  return (
    <Checkbox
      radius="xl"
      checked={checked}
      disabled={toggle.isPending}
      aria-label={todo.isDone ? 'Mark as not done' : 'Mark as done'}
      onChange={(event) => toggle.mutate({ id: todo.id, isDone: event.currentTarget.checked })}
    />
  )
}
