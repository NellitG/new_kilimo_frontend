# Kilimo Stack frontend

A responsive React frontend foundation for Kilimo Stack, built with Vite.

## Run locally

Install dependencies with `npm install`, then run `npm run dev`. Use `npm run build` to create a production bundle. The agricultural hero photo and Google Fonts load from their public CDNs; the page uses system fallbacks if they are unavailable.

## Current scope

The React landing page is composed from reusable components in `src/components/`; shared service descriptions live in `src/data/services.js`. Service descriptions are informational and contain no records, user counts, permissions or production statistics. The sign-in form intentionally reports that authentication is not connected: the original Django project, endpoint contract, token handling and authorization rules were not present in the workspace, so no authentication behavior has been guessed.

The Agricultural Advisory card opens the Farmer Advisory AI chat at `/advisory`. To connect it to the existing backend, set `VITE_ADVISORY_CHAT_ENDPOINT` to the backend's chat endpoint. The frontend sends a credentialed `POST` with JSON `{ "message": "...", "messages": [{ "role": "user|assistant", "content": "..." }] }` and expects JSON containing a non-empty `answer`, `response`, or `message` string. The endpoint should apply the project's established authentication/CSRF policy and may use its existing advisory knowledge base/RAG service. No AI endpoint or contract was included in this frontend workspace, so the chat shows a configuration/service error rather than fabricated guidance until the backend URL is supplied. “Save chat” stores the current conversation in this browser's local storage; “Clear chat” clears the active conversation and that saved copy.

To connect the account flow, integrate the existing Django login endpoint and its established request, response, CSRF/token, redirect and error handling conventions. Add the existing route map and service APIs when those contracts are available.
