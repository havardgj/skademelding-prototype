/**
 * Minimal client for a Cognigy REST endpoint.
 *
 * The endpoint URL contains an access token and is environment-specific,
 * so it's read from an env var rather than hardcoded — see .env.example.
 */

export type CognigyResponse = {
  text: string
  sessionId: string
}

const ENDPOINT_URL = import.meta.env.VITE_COGNIGY_ENDPOINT_URL as
  | string
  | undefined

function getOrCreateSessionId(): string {
  const key = 'cognigy-session-id'
  let sessionId = sessionStorage.getItem(key)
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    sessionStorage.setItem(key, sessionId)
  }
  return sessionId
}

/**
 * Sends an instruction + free text to the Cognigy AI Agent and returns
 * the generated result text.
 */
export async function runInstruction(
  instruction: string,
  text: string,
): Promise<CognigyResponse> {
  if (!ENDPOINT_URL) {
    throw new Error(
      'VITE_COGNIGY_ENDPOINT_URL er ikke satt. Se .env.example.',
    )
  }

  const message = `INSTRUKS: ${instruction}\n\nTEKST: ${text}`

  const response = await fetch(ENDPOINT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: 'skademelding-prototype',
      sessionId: getOrCreateSessionId(),
      text: message,
    }),
  })

  if (!response.ok) {
    throw new Error(`Cognigy-kallet feilet (${response.status})`)
  }

  const json = (await response.json()) as { text?: string; sessionId: string }

  return {
    text: json.text ?? '',
    sessionId: json.sessionId,
  }
}
