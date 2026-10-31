import { ActionIcon, Group, Paper, TextInput, Tooltip } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useState, type FormEvent } from 'react'
import { TODO_NAME_MAX, type Todo } from '@/entities/todo'
import { useRenameTodo } from '../api/useRenameTodo'

interface EditTodoFormProps {
  todo: Todo
  /** Called when editing ends: saved, unchanged, or cancelled. */
  onDone: () => void
}

export const EditTodoForm = ({ todo, onDone }: EditTodoFormProps) => {
  const [name, setName] = useState(todo.name)
  const rename = useRenameTodo()
  const trimmed = name.trim()
  const tooLong = trimmed.length > TODO_NAME_MAX
  const canSave = trimmed !== '' && !tooLong

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!canSave) return
    if (trimmed === todo.name) return onDone()
    rename.mutate({ id: todo.id, name: trimmed }, { onSuccess: onDone })
  }

  return (
    <Paper withBorder p="sm">
      <form onSubmit={onSubmit}>
        <Group align="flex-start" gap="xs" wrap="nowrap">
          <TextInput
            flex={1}
            aria-label="Todo text"
            value={name}
            autoFocus
            onChange={(event) => setName(event.currentTarget.value)}
            onKeyDown={(event) => event.key === 'Escape' && onDone()}
            error={tooLong ? `At most ${TODO_NAME_MAX} characters` : rename.error?.message}
          />
          <Tooltip label="Save">
            <ActionIcon type="submit" variant="light" size="lg" aria-label="Save" loading={rename.isPending} disabled={!canSave}>
              <IconCheck size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Cancel">
            <ActionIcon variant="subtle" color="gray" size="lg" aria-label="Cancel editing" onClick={onDone}>
              <IconX size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </form>
    </Paper>
  )
}
