import { useState } from 'react'
import { Flex, Box } from '@gjensidige/builders-components'
import { TopNav } from './components/TopNav'
import { EntrancePage } from './pages/EntrancePage'
import { SkadePage } from './pages/SkadePage'
import { ResultPage } from './pages/ResultPage'
import { runInstruction } from './lib/cognigy'
import { parseSkadeFacts, type SkadeFacts } from './lib/parseSkadeFacts'
import { loadHendelser, formatHendelserForPrompt } from './lib/hendelser'

// Kun bil-relaterte hendelser (ulykkeskode starter med "MV") skal tilbys
// i denne flyten, siden dette kun gjelder skademelding for bil.
const hendelser = loadHendelser().filter((h) =>
  h.ulykkeskode.startsWith('MV'),
)
const hendelserListe = formatHendelserForPrompt(hendelser)
const gyldigeHendelsestyper = new Set(hendelser.map((h) => h.tittel))

// NB: Kun til intern test av instruks-mekanismen – ikke for reell bruk mot kunder.
function buildInstruction(): string {
  const today = new Date().toLocaleDateString('nb-NO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return `Svar på norsk.
1. Vurder først om kundens tekst faktisk beskriver en relevant hendelse (en skade, et uhell eller en ulykke) knyttet til bilen. Hvis teksten er tom, ikke gir mening, eller er helt urelatert til en skadehendelse, sett "relevant": false og la de andre feltene stå som tomme strenger ("").
2. Hvis teksten ER relevant, sett "relevant": true og gjør følgende:
   a. Gjenfortell hendelsen som en overdrevet dramatisk, teatralsk fortelling – som om det var en episode i en actionfilm eller heltesaga. Ikke gjør narr av personen, bare gjør situasjonen episk.
   b. Lag et kort sammendrag av hendelsen på MAKS 8 ord – nøytralt og saklig (ikke dramatisert), som en overskrift.
   c. Hent ut følgende fakta, hvis de er nevnt:
      - dato: Hvis beskrivelsen inneholder en relativ tidsangivelse (f.eks. "i går", "forrige lørdag", "for tre dager siden"), regn ut den faktiske datoen basert på at DAGENS DATO er ${today}. Skriv datoen i formatet "31. mars 2026" (dag uten ledende null, månedsnavn med små bokstaver, fullt årstall). Bruk "Ikke oppgitt" hvis ingen tidsangivelse nevnes.
      - sted: Stedsnavnet som nevnes. Hvis stedet ligger i en kjent norsk kommune du er rimelig sikker på, legg til kommunenavnet i parentes rett etter stedsnavnet, f.eks. "Lillestrøm (Lillestrøm kommune)". Hvis du er usikker, utelat parentesen – ikke gjett.
      - hendelsestype: Velg NØYAKTIG ÉN tittel fra listen med gyldige hendelsestyper under, basert på hva som best matcher kundens beskrivelse. Du skal ALDRI dikte opp en egen hendelsestype – bruk kun tekster som er identiske med en av titlene i listen. Hvis ingen av dem passer noenlunde, bruk "Ikke identifisert".

Gyldige hendelsestyper (velg én av disse tekstene nøyaktig):
${hendelserListe}

Svar KUN med et JSON-objekt på nøyaktig dette formatet, uten noe tekst før eller etter:
{"relevant": true, "bearbeidetBeskrivelse": "...", "sammendrag": "...", "dato": "...", "sted": "...", "hendelsestype": "..."}`
}

type View = 'entrance' | 'skade' | 'result'

function App() {
  const [view, setView] = useState<View>('entrance')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SkadeFacts | null>(null)

  const handleNext = async () => {
    setView('result')
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await runInstruction(buildInstruction(), description)
      const facts = parseSkadeFacts(response.text)

      // Ekstra sikkerhetsnett: sjekk at modellen faktisk brukte en tittel
      // fra den gyldige listen, i stedet for å dikte opp noe eget.
      if (
        facts.isRelevant &&
        facts.incidentType !== 'Ikke oppgitt' &&
        !gyldigeHendelsestyper.has(facts.incidentType)
      ) {
        facts.incidentType = 'Ikke identifisert'
      }

      setResult(facts)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Noe gikk galt ved henting av vurdering.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex layout={1} gap="none">
      <TopNav />
      <Box variant="white" padding={{ xs: 'md', md: 'xl' }}>
        {view === 'entrance' && (
          <EntrancePage onSelectCar={() => setView('skade')} />
        )}
        {view === 'skade' && (
          <SkadePage
            description={description}
            onDescriptionChange={setDescription}
            onNext={handleNext}
            onBack={() => setView('entrance')}
          />
        )}
        {view === 'result' && (
          <ResultPage
            loading={loading}
            error={error}
            result={result}
            description={description}
            onBack={() => setView('skade')}
          />
        )}
      </Box>
    </Flex>
  )
}

export default App
