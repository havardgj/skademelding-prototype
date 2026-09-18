import { Flex, Box, Text } from '@gjensidige/builders-components'

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
          <Flex direction="row" gap="lg" align="center">
            <Text weight="700">Gjensidige</Text>
            {globalTabs.map((tab) => (
              <Text key={tab} size="small">
                {tab}
              </Text>
            ))}
          </Flex>
          <Flex direction="row" gap="md" align="center">
            <Text size="small">Meld skade</Text>
            <Text size="small">Sven Hansen Østli</Text>
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
