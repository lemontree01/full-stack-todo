import { ActionIcon, Tooltip, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'

export const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme()
  const current = useComputedColorScheme('light')
  const next = current === 'dark' ? 'light' : 'dark'
  const label = `Switch to ${next} theme`

  return (
    <Tooltip label={label}>
      <ActionIcon variant="default" size="lg" aria-label={label} onClick={() => setColorScheme(next)}>
        {current === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
      </ActionIcon>
    </Tooltip>
  )
}
