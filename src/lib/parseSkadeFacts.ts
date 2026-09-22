export type SkadeFacts = {
  isRelevant: boolean
  narrative: string
  summary: string
  date: string
  place: string
  incidentType: string
}

/**
 * Parses the JSON object returned by the "Skademelding Tekstassistent" agent.
 * Strips optional markdown code fences in case the model wraps the JSON in
 * ```json ... ``` even though it's instructed not to.
 */
export function parseSkadeFacts(raw: string): SkadeFacts {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*|\s*```$/g, '')

  let parsed: unknown
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    throw new Error('Kunne ikke tolke svaret fra agenten som JSON.')
  }

  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Svaret fra agenten hadde uventet format.')
  }

  const obj = parsed as Record<string, unknown>

  return {
    isRelevant: obj.relevant !== false,
    narrative:
      typeof obj.bearbeidetBeskrivelse === 'string'
        ? obj.bearbeidetBeskrivelse
        : '',
    summary: typeof obj.sammendrag === 'string' ? obj.sammendrag : '',
    date: typeof obj.dato === 'string' ? obj.dato : 'Ikke oppgitt',
    place: typeof obj.sted === 'string' ? obj.sted : 'Ikke oppgitt',
    incidentType:
      typeof obj.hendelsestype === 'string' ? obj.hendelsestype : 'Ikke oppgitt',
  }
}
