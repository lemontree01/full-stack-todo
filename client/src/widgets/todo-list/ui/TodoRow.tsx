import { ActionIcon, Tooltip } from '@mantine/core'
import { IconPencil } from '@tabler/icons-react'
import { useState } from 'react'
import { TodoCard, type Todo } from '@/entities/todo'
import { DeleteTodoButton } from '@/features/todo-delete'
import { EditTodoForm } from '@/features/todo-edit'
import { ToggleTodoCheckbox } from '@/features/todo-toggle'

export const TodoRow = ({ todo }: { todo: Todo }) => {
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) return <EditTodoForm todo={todo} onDone={() => setIsEditing(false)} />

  return (
    <TodoCard
      todo={todo}
      leading={<ToggleTodoCheckbox todo={todo} />}
      actions={
        <>
          <Tooltip label="Edit">
            <ActionIcon variant="subtle" color="gray" aria-label="Edit todo" onClick={() => setIsEditing(true)}>
              <IconPencil size={18} />
            </ActionIcon>
          </Tooltip>
          <DeleteTodoButton id={todo.id} />
        </>
      }
    />
  )
}
