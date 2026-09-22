import { Title, Text, Card, Link, Flex } from '@gjensidige/builders-components'
import { Document } from '@gjensidige/builders-icons'

const rows: { label: string; value: string }[] = [
  { label: 'Dekning', value: 'Bil pluss' },
  { label: 'Gyldig fra', value: '06.02.2026' },
  { label: 'Bonus', value: '75 % >3 år' },
  { label: 'Egenandel', value: '8000 kroner' },
]

export function InsuranceDetailsInfoCard() {
  return (
    <Card variant="white-yellow" size="sm">
      <Flex direction="row" gap="xs" align="center" wrap="nowrap">
        <Document />
        <Title as="h3" size="6">
          Forsikringsdetaljer
        </Title>
      </Flex>

      <Flex layout={1} gap="xs">
        {rows.map(({ label, value }) => (
          <Flex key={label} direction="row" gap="xs">
            <Text weight="500">{label}:</Text>
            <Text>{value}</Text>
          </Flex>
        ))}
      </Flex>

      <Link href="#">Se forsikringsvilkår</Link>
    </Card>
  )
}
