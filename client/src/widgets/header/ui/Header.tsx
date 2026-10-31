import { Group, Text, ThemeIcon } from '@mantine/core'
import { IconChecks } from '@tabler/icons-react'
import { useSession } from '@/entities/session'
import { AuthButton, LogoutButton } from '@/features/auth'
import { ThemeToggle } from '@/features/theme-toggle'

export const Header = () => {
  const { data: user } = useSession()

  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      <Group gap="xs" wrap="nowrap">
        <ThemeIcon radius="md" size="lg">
          <IconChecks size={20} />
        </ThemeIcon>
        <Text fw={700} size="lg">
          Todo
        </Text>
      </Group>
      <Group gap="xs" wrap="nowrap">
        {user && !user.isGuest && (
          <Text size="sm" c="dimmed" visibleFrom="xs">
            {user.login}
          </Text>
        )}
        <ThemeToggle />
        {user?.isGuest && (
          <>
            <AuthButton mode="login" variant="default">
              Sign in
            </AuthButton>
            <AuthButton mode="register">Sign up</AuthButton>
          </>
        )}
        {user && !user.isGuest && <LogoutButton />}
      </Group>
    </Group>
  )
}
