import { Title, Text, Card } from '@gjensidige/builders-components'

export function BonusLossInfoCard() {
  return (
    <Card variant="white-yellow" size="sm">
      <Title as="h3" size="6">
        Denne skaden gir bonustap
      </Title>
      <Text>
        Når forsikringen dekker reparasjon av en skade som du selv er skyld
        i, eller når du ikke vet hvem som har forårsaket skaden, mister du
        bonus.
      </Text>
    </Card>
  )
}
