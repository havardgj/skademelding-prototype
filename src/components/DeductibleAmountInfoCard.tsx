import { Title, Text, Flex, Card } from '@gjensidige/builders-components'

type Props = {
  title: string
}

export function DeductibleAmountInfoCard({ title }: Props) {
  return (
    <Card variant="white-yellow" size="sm">
      <Title as="h3" size="6">
        {title}
      </Title>
      <Flex layout={1} gap="none">
        <Text>Egenandel 8000 kroner</Text>
        <Text>Denne skaden gir bonustap</Text>
      </Flex>
    </Card>
  )
}
