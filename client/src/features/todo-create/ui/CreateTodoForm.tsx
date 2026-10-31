import { Button, Group, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState, type FormEvent } from 'react'
import { TODO_NAME_MAX } from '@/entities/todo'
import { useCreateTodo } from '../api/useCreateTodo'

export const CreateTodoForm = () => {
  const [name, setName] = useState('')
  const create = useCreateTodo()
  const tooLong = name.trim().length > TODO_NAME_MAX
  const canSubmit = name.trim() !== '' && !tooLong

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (canSubmit) create.mutate(name.trim(), { onSuccess: () => setName('') })
  }

  return (
    <form onSubmit={onSubmit}>
      <Group align="flex-start" gap="xs" wrap="nowrap">
        <TextInput
          flex={1}
          aria-label="New todo"
          placeholder="What needs to be done?"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          error={tooLong ? `At most ${TODO_NAME_MAX} characters` : create.error?.message}
        />
        <Button type="submit" loading={create.isPending} disabled={!canSubmit} leftSection={<IconPlus size={16} />}>
          Add
        </Button>
      </Group>
    </form>
  )
}
