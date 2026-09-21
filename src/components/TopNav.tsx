import { Flex, Box, Text } from '@gjensidige/builders-components'
import { GjensidigePrimary } from '@gjensidige/builders-icons/logos'
import { ChevronDown, Person, ReportClaim } from '@gjensidige/builders-icons'

const globalTabs = ['Privat', 'Bedrift', 'Landbruk']
const secondLevelLinks = [
  'Min oversikt',
  'Forsikring',
  'Pensjon',
  'Fondssparing',
  'Postkasse',
  'Innstillinger',
]

export function TopNav() {
  return (
    <Flex layout={1} gap="none">
      <Box variant="darkblue" padding="md">
        <Flex direction="row" gap="lg" align="center" justify="space-between">
          <Flex direction="row" gap="xl" align="center">
            <GjensidigePrimary
              style={{ height: 'var(--builders-unit-30)', width: 'auto' }}
            />
            <Flex direction="row" gap="lg" align="center">
              {globalTabs.map((tab) => (
                <Text key={tab} size="small">
                  {tab}
                </Text>
              ))}
            </Flex>
          </Flex>
          <Flex direction="row" gap="md" align="center">
            <Flex direction="row" gap="xs" align="center">
              <ReportClaim />
              <Text size="small">Meld skade</Text>
            </Flex>
            <Flex direction="row" gap="xs" align="center">
              <Person />
              <Text size="small">NN</Text>
              <ChevronDown />
            </Flex>
          </Flex>
        </Flex>
      </Box>

      <Box variant="blue" padding="sm">
        <Flex direction="row" gap="lg" wrap="wrap">
          {secondLevelLinks.map((link) => (
            <Text key={link} size="small" weight="500">
              {link}
            </Text>
          ))}
        </Flex>
      </Box>
    </Flex>
  )
}
