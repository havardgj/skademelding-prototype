import { Title, Text, Card } from '@gjensidige/builders-components'

export function DeductibleInfoCard() {
  return (
    <Card variant="white-yellow" size="sm">
      <Title as="h3" size="6">
        Egenandel
      </Title>
      <Text>
        Egenandelen er summen du må betale selv hvis du melder en skade.
        Standard egenandel ved kollisjonsskader på bilen din er 8 000 kroner.
      </Text>
    </Card>
  )
}
