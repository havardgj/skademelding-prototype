# Skademelding – prototype

Prototype av en skademeldingsside for Gjensidige, bygget med React + Vite og
[Gjensidige Builders](https://www.gjensidige.builders/docs/) designsystem.

Dette er **kun en visuell prototype** – ingen faktisk skadesak sendes noe sted.
Første steg som er bygget ut er "Når skjedde det?" (datovalg), modellert etter
tilsvarende steg i Gjensidige sin skademeldingsflyt.

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

3. Start dev-server:

   ```bash
   npm run dev
   ```

4. Bygg for produksjon:

   ```bash
   npm run build
   ```

## Teknologi

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [@gjensidige/builders-components](https://www.gjensidige.builders/docs/) – Gjensidiges designsystem

## Struktur

```
src/
  components/
    TopNav.tsx    – forenklet toppnavigasjon (global + underniva)
  App.tsx         – "Når skjedde det?"-steget (datovelger)
  main.tsx        – entry point, laster Builders styles/fonts/tokens
```
