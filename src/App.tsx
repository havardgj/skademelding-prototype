import { useState } from 'react'
import { Flex, Box } from '@gjensidige/builders-components'
import { TopNav } from './components/TopNav'
import { SkadePage } from './pages/SkadePage'
import { ResultPage } from './pages/ResultPage'
import { runInstruction } from './lib/cognigy'

// NB: Kun til intern test av instruks-mekanismen – ikke for reell bruk mot kunder.
const INSTRUCTION =
  'Svar på norsk. Gjenfortell hendelsen som en overdrevet dramatisk, teatralsk fortelling – som om det var en episode i et actionfilm eller heltesaga. Ikke gjør narr av personen, bare gjør situasjonen episk.'

type View = 'skade' | 'result'

function App() {
  const [view, setView] = useState<View>('skade')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  const handleNext = async () => {
    setView('result')
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await runInstruction(INSTRUCTION, description)
      setResult(response.text)
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
        {view === 'skade' ? (
          <SkadePage
            description={description}
            onDescriptionChange={setDescription}
            onNext={handleNext}
          />
        ) : (
          <ResultPage
            loading={loading}
            error={error}
            result={result}
            onBack={() => setView('skade')}
          />
        )}
      </Box>
    </Flex>
  )
}

export default App
