import { useState, useEffect } from 'react'
import {
  Flex,
  Box,
  Title,
  Button,
  FormField,
  Textarea,
} from '@gjensidige/builders-components'
import { VehicleLine } from '../components/VehicleLine'
import { InsuranceDetailsInfoCard } from '../components/InsuranceDetailsInfoCard'
import { DeductibleInfoCard } from '../components/DeductibleInfoCard'
import { BonusInfoCard } from '../components/BonusInfoCard'

type Props = {
  description: string
  onDescriptionChange: (value: string) => void
  onNext: () => void
  onBack: () => void
}

export function SkadePage({
  description,
  onDescriptionChange,
  onNext,
  onBack,
}: Props) {
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 600 : false,
  )

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onNext()
    }
  }

  return (
    <Flex layout={1} gap="xl" center="xl">
      <Flex layout={1} gap="sm">
        <Title as="h1" size="3">
          Meld skade
        </Title>
        <VehicleLine />
      </Flex>

      <Flex direction="row" gap="xl" layout={{ xs: 1, md: '9.3' }} align="start">
        <Flex as="form" layout={1} gap="lg" onSubmit={handleSubmit}>
          <Box variant="blue" padding="lg">
            <FormField
              as={Textarea}
              label="Beskriv hva som har skjedd. Skriv også litt om når og hvor det skjedde"
              maxWarning={1000}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </Box>

          <Flex layout={{ xs: 1, sm: 'auto' }} gap="sm md">
            {[
              <Button key="next" type="submit" arrow>
                Neste
              </Button>,
              <Button
                key="back"
                variant="secondary"
                arrow="left"
                onClick={onBack}
              >
                Tilbake
              </Button>,
            ][isLargeScreen ? 'reverse' : 'slice']()}
          </Flex>
        </Flex>

        <Flex layout={1} gap="lg">
          <InsuranceDetailsInfoCard />
          <DeductibleInfoCard />
          <BonusInfoCard />
        </Flex>
      </Flex>
    </Flex>
  )
}
