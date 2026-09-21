import { useState } from 'react'
import { Flex, Box } from '@gjensidige/builders-components'
import { TopNav } from './components/TopNav'
import { SkadePage } from './pages/SkadePage'
import { ResultPage } from './pages/ResultPage'
import { runInstruction } from './lib/cognigy'

const INSTRUCTION =
  'Foreslå hvilken skadetype dette gjelder (f.eks. bilskade, boligskade, reiseskade, tyveri) og gi en kort oppsummering på én setning.'

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
