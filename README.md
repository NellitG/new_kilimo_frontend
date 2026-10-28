# Kilimo Stack frontend

A responsive React frontend foundation for Kilimo Stack, built with Vite.

## Run locally

Install dependencies with `npm install`, then run `npm run dev`. Use `npm run build` to create a production bundle. The agricultural hero photo and Google Fonts load from their public CDNs; the page uses system fallbacks if they are unavailable.

## Current scope

The React landing page is composed from reusable components in `src/components/`; shared service descriptions live in `src/data/services.js`. Service descriptions are informational and contain no records, user counts, permissions or production statistics. The sign-in form intentionally reports that authentication is not connected: the original Django project, endpoint contract, token handling and authorization rules were not present in the workspace, so no authentication behavior has been guessed.

To connect the account flow, integrate the existing Django login endpoint and its established request, response, CSRF/token, redirect and error handling conventions. Add the existing route map and service APIs when those contracts are available.
