import { ActionIcon, Tooltip } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import { useLogout } from '../api/authMutations'

export const LogoutButton = () => {
  const logout = useLogout()
  return (
    <Tooltip label="Sign out">
      <ActionIcon
        variant="default"
        size="lg"
        aria-label="Sign out"
        loading={logout.isPending}
        onClick={() => logout.mutate()}
      >
        <IconLogout size={18} />
      </ActionIcon>
    </Tooltip>
  )
}
