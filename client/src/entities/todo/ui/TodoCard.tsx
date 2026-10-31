import { Group, Paper, Text } from '@mantine/core'
import type { ReactNode } from 'react'
import type { Todo } from '../model/types'

interface TodoCardProps {
  todo: Todo
  /** Rendered before the text, e.g. a checkbox. */
  leading?: ReactNode
  /** Rendered after the text, e.g. action buttons. */
  actions?: ReactNode
}

export const TodoCard = ({ todo, leading, actions }: TodoCardProps) => (
  <Paper withBorder p="sm">
    <Group wrap="nowrap" gap="sm">
      {leading}
      <Text
        flex={1}
        td={todo.isDone ? 'line-through' : undefined}
        c={todo.isDone ? 'dimmed' : undefined}
        style={{ wordBreak: 'break-word' }}
      >
        {todo.name}
      </Text>
      <Group gap={4} wrap="nowrap">
        {actions}
      </Group>
    </Group>
  </Paper>
)
