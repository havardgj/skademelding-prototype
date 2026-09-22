import { Flex, Title, Text, Card } from '@gjensidige/builders-components'
import { Car, Housing, Travel } from '@gjensidige/builders-icons/products'

type Props = {
  onSelectCar: () => void
}

export function EntrancePage({ onSelectCar }: Props) {
  return (
    <Flex layout={1} gap="xxl" center="xl">
      <Title as="h1" size="2">
        Meld skade, tap eller sykdom
      </Title>

      <Flex layout={1} gap="lg">
        <Title as="h2" size="4">
          Velg fra forsikringene dine
        </Title>

        <Flex layout={{ xs: 1, md: 3 }} gap="md">
          <Card variant="blue-yellow" size="sm" onClick={onSelectCar}>
            <Flex direction="row" gap="sm" align="start" wrap="nowrap">
              <Car />
              <Flex layout={1} gap="xs">
                <Title as="h3" size="6">
                  Bil
                </Title>
                <Text>Toyota RAV4, BS 73427</Text>
              </Flex>
            </Flex>
          </Card>

          <Card variant="blue-yellow" size="sm">
            <Flex direction="row" gap="sm" align="start" wrap="nowrap">
              <Housing />
              <Flex layout={1} gap="xs">
                <Title as="h3" size="6">
                  Hus
                </Title>
                <Text>Gamle Rustadvei 15, 3470 Slemmestad</Text>
              </Flex>
            </Flex>
          </Card>

          <Card variant="blue-yellow" size="sm">
            <Flex direction="row" gap="sm" align="start" wrap="nowrap">
              <Travel />
              <Title as="h3" size="6">
                Reise
              </Title>
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
}
