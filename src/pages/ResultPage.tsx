import {
  Flex,
  Box,
  Title,
  Text,
  Label,
  Button,
  Loader,
  Alert,
} from '@gjensidige/builders-components'

type Props = {
  loading: boolean
  error: string | null
  result: string | null
  onBack: () => void
}

export function ResultPage({ loading, error, result, onBack }: Props) {
  return (
    <Flex layout={1} gap="xl" center="xl">
      <Flex direction="row" gap="xl" layout={{ xs: 1, md: '3.9' }}>
        <Flex layout={1} gap="sm">
          <Title as="h1" size="3">
            Meld skade
          </Title>
        </Flex>

        <Flex layout={1} gap="lg">
          <Box variant="blue" padding="lg">
            <Flex layout={1} gap="xs">
              <Label>Høres dette sånn noenlunde riktig ut?</Label>

              {loading && <Loader variant="spinner" aria-label="Henter resultat" />}

              {!loading && error && (
                <Alert severity="error" variant="outlined">
                  {error}
                </Alert>
              )}

              {!loading && !error && result && <Text size="body">{result}</Text>}
            </Flex>
          </Box>

          <Flex layout={{ xs: 1, sm: 'auto' }} gap="sm md" justify="start">
            <Button variant="secondary" arrow="left" onClick={onBack}>
              Tilbake
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
