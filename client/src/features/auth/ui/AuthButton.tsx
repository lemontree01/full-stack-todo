import { Button, Modal, type ButtonProps } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { ReactNode } from 'react'
import { AuthForm, type AuthMode } from './AuthForm'

interface AuthButtonProps extends ButtonProps {
  mode: AuthMode
  children: ReactNode
}

/** A button that opens the sign-in / sign-up form in a dialog. */
export const AuthButton = ({ mode, children, ...buttonProps }: AuthButtonProps) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button {...buttonProps} onClick={open}>
        {children}
      </Button>
      <Modal opened={opened} onClose={close} centered radius="lg" padding="xl">
        <AuthForm initialMode={mode} onSuccess={close} />
      </Modal>
    </>
  )
}
