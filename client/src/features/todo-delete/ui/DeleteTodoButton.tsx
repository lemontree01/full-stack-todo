import { ActionIcon, Tooltip } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useDeleteTodo } from '../api/useDeleteTodo'

export const DeleteTodoButton = ({ id }: { id: number }) => {
  const remove = useDeleteTodo()
  return (
    <Tooltip label="Delete">
      <ActionIcon
        variant="subtle"
        color="red"
        aria-label="Delete todo"
        loading={remove.isPending}
        onClick={() => remove.mutate(id)}
      >
        <IconTrash size={18} />
      </ActionIcon>
    </Tooltip>
  )
}
