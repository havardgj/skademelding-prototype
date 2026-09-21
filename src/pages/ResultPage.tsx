import { Flex, Box, Title, Text, Button, Loader, Alert } from '@gjensidige/builders-components'

type Props = {
  loading: boolean
  error: string | null
  result: string | null
  onBack: () => void
}

export function ResultPage({ loading, error, result, onBack }: Props) {
  return (
    <Flex layout={1} gap="xl" center="xl">
      <Title as="h1" size="3">
        Vurdering
      </Title>

      {loading && (
        <Box variant="blue" padding="lg">
          <Loader variant="spinner" aria-label="Henter vurdering" />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      )}

      {!loading && !error && result && (
        <Box variant="blue" padding="lg">
          <Text size="body">{result}</Text>
        </Box>
      )}

      <Flex layout={{ xs: 1, sm: 'auto' }} gap="sm md" justify="start">
        <Button variant="secondary" arrow="left" onClick={onBack}>
          Tilbake
        </Button>
      </Flex>
    </Flex>
  )
}
