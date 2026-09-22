// Rå CSV-tekst importeres direkte av Vite (?raw) og parses ved kjøring.
import hendelserCsv from '../data/hendelser.csv?raw'

export type Hendelse = {
  hendelseskode: string
  ulykkeskode: string
  tittel: string
  beskrivelse: string
}

function parseCsvLine(line: string): string[] {
  return line.split(';').map((cell) => cell.trim())
}

/**
 * Parser CSV-filen med gyldige hendelseskoder/-titler/-beskrivelser
 * (semikolon-separert, norsk format). Filtrerer bort tomme rader.
 */
export function loadHendelser(): Hendelse[] {
  const lines = hendelserCsv
    .replace(/^\uFEFF/, '') // fjern evt. BOM
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)

  const [, ...rows] = lines // hopp over header-raden

  return rows
    .map((line) => {
      const [hendelseskode, ulykkeskode, tittel, beskrivelse] =
        parseCsvLine(line)
      return { hendelseskode, ulykkeskode, tittel, beskrivelse }
    })
    .filter((row) => row.tittel && row.beskrivelse)
}

/**
 * Bygger en kompakt tekstliste over gyldige hendelsestyper, egnet til å
 * legges inn i en LLM-instruks. Format: "- <tittel>: <beskrivelse>"
 */
export function formatHendelserForPrompt(hendelser: Hendelse[]): string {
  return hendelser
    .map((h) => `- ${h.tittel}: ${h.beskrivelse}`)
    .join('\n')
}
