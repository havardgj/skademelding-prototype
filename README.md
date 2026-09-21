# Skademelding – prototype

Prototype av en skademeldingsside for Gjensidige, bygget med React + Vite og
[Gjensidige Builders](https://www.gjensidige.builders/docs/) designsystem.

Dette er **kun en visuell prototype** – ingen faktisk skadesak sendes noe sted.
Brukeren beskriver hendelsen med fritekst, og teksten sendes til en Cognigy
AI Agent som foreslår skadetype og oppsummerer hendelsen på en resultatside.

## Kom i gang

Builders-pakkene ligger på GitHub Package Registry og krever autentisering,
selv om du bare skal lese dem.

1. Opprett en GitHub personal access token med `read:packages`-scope (eller
   bruk `gh auth token` hvis du er logget inn med `gh` og har riktig scope).
2. Sett tokenet som miljøvariabel før du installerer:

   ```bash
   export NPM_AUTH_TOKEN=ditt_github_token
   npm install
   ```

   `.npmrc` i repoet peker til `${NPM_AUTH_TOKEN}` — tokenet skal **aldri**
   skrives direkte inn i `.npmrc` eller committes.

3. Kopier `.env.example` til `.env` og sett riktig Cognigy-endepunkt-URL
   (se [Cognigy-agent](#cognigy-agent) under):

   ```bash
   cp .env.example .env
   ```

4. Start dev-server:

   ```bash
   npm run dev
   ```

5. Bygg for produksjon:

   ```bash
   npm run build
   ```

## Cognigy-agent

Fritekstbeskrivelsen brukeren skriver inn sendes til en dedikert Cognigy AI
Agent ("Skademelding Tekstassistent") via et REST-endepunkt. Frontend sender
alltid instruks og tekst sammen i én melding, strukturert slik:

```
INSTRUKS: <hva agenten skal gjøre>

TEKST: <brukerens fritekst>
```

Agenten er konfigurert til kun å følge instruksen og svare med resultatet —
ingen småprat, ingen gjentakelse av spørsmålet. Dette gjør det enkelt å
gjenbruke samme agent til andre instruksjoner senere (f.eks. andre steg i
skademeldingsflyten) uten å endre agent-konfigurasjonen — bare send en annen
instruks fra frontend.

Se `src/lib/cognigy.ts` for selve API-kallet.

**Merk:** Endepunkt-URL-en inneholder en tilgangstoken og er miljøspesifikk.
Den ligger i `.env` (gitignored), ikke i kildekoden. `.env.example` viser
formatet.

## Teknologi

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [@gjensidige/builders-components](https://www.gjensidige.builders/docs/) – Gjensidiges designsystem
- Cognigy AI Agent (REST-endepunkt) for tekstbehandling

## Struktur

```
src/
  components/
    TopNav.tsx      – forenklet toppnavigasjon (global + undernivå)
  pages/
    SkadePage.tsx   – "Meld skade"-steget (fritekstfelt)
    ResultPage.tsx  – viser resultat fra Cognigy-agenten (loading/error/resultat)
  lib/
    cognigy.ts      – REST-klient mot Cognigy AI Agent-endepunktet
  App.tsx           – enkel side-navigasjon (state-basert, ingen router)
  main.tsx          – entry point, laster Builders styles/fonts/tokens
```
