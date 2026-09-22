import { useState, useEffect } from 'react'
import {
  Flex,
  Box,
  Title,
  Text,
  Label,
  Button,
  FormField,
  Input,
  Datepicker,
  Loader,
  Alert,
  Expandable,
} from '@gjensidige/builders-components'
import { nb } from '@daypicker/react/locale'
import { Ai } from '@gjensidige/builders-icons'
import { Agreements } from '@gjensidige/builders-icons/products'
import type { SkadeFacts } from '../lib/parseSkadeFacts'
import { VehicleLine } from '../components/VehicleLine'
import { InsuranceDetailsInfoCard } from '../components/InsuranceDetailsInfoCard'
import { DeductibleAmountInfoCard } from '../components/DeductibleAmountInfoCard'

type Props = {
  loading: boolean
  error: string | null
  result: SkadeFacts | null
  description: string
  onBack: () => void
}

const factRows: { key: keyof SkadeFacts; label: string }[] = [
  { key: 'date', label: 'Dato' },
  { key: 'place', label: 'Sted' },
  { key: 'incidentType', label: 'Hendelse' },
]

// Statiske kontekst-data (f.eks. fra kundeprofil/polise) – hardkodet i denne prototypen.
const contextRows: { label: string; value: string }[] = [
  { label: 'Navn', value: 'Ola Nordmann' },
  { label: 'Adresse', value: 'Storgata 1, 0155 Oslo' },
  { label: 'Bilmodell', value: 'Toyota RAV4' },
  { label: 'Registreringsnummer', value: 'BS73427' },
  { label: 'Årsmodell', value: '2018' },
  { label: 'Bilens alder', value: '8 år' },
  { label: 'Førstegangsregistrert i Norge', value: '15. mars 2018' },
  { label: 'Estimert kilometerstand', value: '12345' },
]

export function ResultPage({
  loading,
  error,
  result,
  description,
  onBack,
}: Props) {
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth >= 600 : false,
  )
  const [manualDate, setManualDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 600)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const hasDate = result?.date !== 'Ikke oppgitt'
  const dateProvided = hasDate || manualDate !== undefined
  const hasPlace = result?.place !== 'Ikke oppgitt'

  return (
    <Flex layout={1} gap="xl" center="xl">
      <Flex layout={1} gap="sm">
        <Title as="h1" size="3">
          Meld skade
        </Title>
        <VehicleLine />
      </Flex>

      <Flex direction="row" gap="xl" layout={{ xs: 1, md: '9.3' }} align="start">
        <Flex layout={1} gap="lg">
          <Box variant="blue" padding="lg">
            <Flex layout={1} gap="lg">
              <Flex layout={1} gap="xs">
                {loading && <Loader variant="spinner" aria-label="Henter resultat" />}

                {!loading && error && (
                  <Alert severity="error" variant="outlined">
                    {error}
                  </Alert>
                )}

                {!loading && !error && result && result.isRelevant && (
                  <>
                    <Flex direction="row" gap="xs" align="center" wrap="nowrap">
                      <Ai />
                      <Text weight="700">{result.summary}</Text>
                    </Flex>
                    <Text size="body" style={{ fontStyle: 'italic' }}>
                      {result.narrative}
                    </Text>
                  </>
                )}

                {!loading && !error && result && !result.isRelevant && (
                  <Flex direction="row" gap="xs" align="center" wrap="nowrap">
                    <Ai />
                    <Text weight="700">Ingen relevant beskrivelse oppgitt</Text>
                  </Flex>
                )}
              </Flex>

              {!loading && !error && result && result.isRelevant && (
                <Flex layout={1} gap="xs">
                  <Text size="body" weight="700">
                    Fakta funnet i beskrivelsen
                  </Text>
                  {factRows
                    .filter(
                      ({ key }) =>
                        (key !== 'date' || hasDate) &&
                        (key !== 'place' || hasPlace),
                    )
                    .map(({ key, label }) => (
                      <Flex key={key} direction="row" gap="xs">
                        <Text size="body" weight="500">
                          {label}:
                        </Text>
                        <Text size="body">{result[key]}</Text>
                      </Flex>
                    ))}
                </Flex>
              )}

              {!loading && !error && result && result.isRelevant && !hasDate && (
                <Flex direction="row" gap="sm" align="center">
                  <Label htmlFor="hendelsesdato">Når skjedde dette:</Label>
                  <Datepicker
                    id="hendelsesdato"
                    locale={nb}
                    labelDropdownMonth="Måned"
                    labelDropdownYear="År"
                    labelToggleButton="Åpne kalender"
                    max={new Date()}
                    value={manualDate}
                    onChange={(selected) => setManualDate(selected)}
                  />
                </Flex>
              )}

              {!loading && !error && result && (
                <Expandable variant="line-blue-yellow" defaultOpen={false}>
                  <Expandable.Title>Kontekst</Expandable.Title>
                  <Expandable.Content>
                    <Flex layout={1} gap="xs">
                      {[
                        ...contextRows,
                        {
                          label: 'Kundens egen beskrivelse',
                          value: description,
                        },
                      ].map(({ label, value }) => (
                        <Flex key={label} direction="row" gap="xs">
                          <Text size="small" weight="500">
                            {label}:
                          </Text>
                          <Text size="small">{value}</Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Expandable.Content>
                </Expandable>
              )}
            </Flex>
          </Box>

          {!loading && !error && result && result.isRelevant && hasDate && (
            <FormField
              as={Input}
              type="checkbox"
              label="Jeg lover å svare ærlig og utfyllende"
            />
          )}

          <Flex layout={{ xs: 1, sm: 'auto' }} gap="sm md">
            {[
              !loading && !error && result && result.isRelevant && dateProvided && (
                <Button
                  key="fill"
                  icon={<Agreements />}
                  iconPosition="left"
                >
                  Fyll ut skademelding: {result.incidentType}
                </Button>
              ),
              <Button
                key="back"
                variant="secondary"
                arrow="left"
                onClick={onBack}
              >
                Tilbake
              </Button>,
            ]
              .filter(Boolean)
              [isLargeScreen ? 'reverse' : 'slice']()}
          </Flex>
        </Flex>

        <Flex layout={1} gap="lg">
          <InsuranceDetailsInfoCard />

          {!loading && !error && result && result.isRelevant && (
            <DeductibleAmountInfoCard title={`Hendelse: ${result.incidentType}`} />
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
