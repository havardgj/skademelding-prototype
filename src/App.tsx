import { useState, useEffect } from 'react'
import {
  Flex,
  Box,
  Title,
  Button,
  FormField,
  Datepicker,
} from '@gjensidige/builders-components'
import { nb } from '@daypicker/react/locale'
import { TopNav } from './components/TopNav'

function DatoStep() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 600 : false,
  )

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Flex layout={1} gap="xl" center="lg">
      <Flex direction="row" gap="xl" layout={{ md: 2 }}>
        <Flex layout={1} gap="sm">
          <Title as="h1" size="1">
            Når skjedde det?
          </Title>
        </Flex>

        <Flex layout={1} gap="lg">
          <Box variant="blue" padding="lg">
            <FormField
              as={Datepicker}
              label="Velg datoen hendelsen skjedde eller da du oppdaget den"
              locale={nb}
              labelDropdownMonth="Måned"
              labelDropdownYear="År"
              labelToggleButton="Åpne kalender"
              max={new Date()}
              value={date}
              onChange={(selected) => setDate(selected)}
            />
          </Box>

          <Flex layout={{ xs: 1, sm: 'auto' }} gap="sm md">
            {[
              <Button key="next" arrow onClick={() => {}}>
                Neste
              </Button>,
              <Button
                key="back"
                variant="secondary"
                arrow="left"
                onClick={() => {}}
              >
                Tilbake
              </Button>,
            ][isLargeScreen ? 'reverse' : 'slice']()}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

function App() {
  return (
    <Flex layout={1} gap="none">
      <TopNav />
      <Box padding={{ xs: 'md', md: 'xl' }}>
        <DatoStep />
      </Box>
    </Flex>
  )
}

export default App
