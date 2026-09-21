import { useState, useEffect } from 'react'
import {
  Flex,
  Box,
  Title,
  Button,
  FormField,
  Input,
} from '@gjensidige/builders-components'

type Props = {
  description: string
  onDescriptionChange: (value: string) => void
  onNext: () => void
}

export function SkadePage({ description, onDescriptionChange, onNext }: Props) {
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 600 : false,
  )

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Flex layout={1} gap="xl" center="xl">
      <Flex direction="row" gap="xl" layout={{ xs: 1, md: '3.9' }}>
        <Flex layout={1} gap="sm">
          <Title as="h1" size="3">
            Meld skade
          </Title>
        </Flex>

        <Flex layout={1} gap="lg">
          <Box variant="blue" padding="lg">
            <FormField
              as={Input}
              label="Fortell hva som har skjedd"
              type="text"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </Box>

          <Flex layout={{ xs: 1, sm: 'auto' }} gap="sm md">
            {[
              <Button key="next" arrow onClick={onNext}>
                Neste
              </Button>,
              <Button key="back" variant="secondary" arrow="left" disabled>
                Tilbake
              </Button>,
            ][isLargeScreen ? 'reverse' : 'slice']()}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
