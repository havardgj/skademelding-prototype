import { Title, Text, Card } from '@gjensidige/builders-components'

export function BonusInfoCard() {
  return (
    <Card variant="white-yellow" size="sm">
      <Title as="h3" size="6">
        Bonus
      </Title>
      <Text>
        Bonus er en rabattordning som belønner skadefri kjøring med lavere
        pris på forsikringen. Får du en skade som påvirker bonusen din,
        rykker du ned på skalaen, noe vi kaller bonustap. Ikke alle typer
        skader gir bonustap.
      </Text>
    </Card>
  )
}
