# PlantApp Case Study

This project is a React Native case study built according to the provided Figma design and requirements.

## Features

- Onboarding flow (Welcome → Step1 → Step2 → Paywall)
- Home flow with bottom tab navigation
- Pixel-perfect UI based on Figma
- Redux Toolkit for state management
- TypeScript for type safety
- API integration for categories & questions
- Paywall screen with plan selection
- Onboarding completion is persisted (user does not re-enter onboarding)

## Flows

**Onboarding Flow**
Welcome → Step1 → Step2 → Paywall  
When the Paywall is closed or the trial is started, onboarding is marked as completed and the user is navigated to Home.

**Home Flow**
Home → Paywall (from Premium banner)

Paywall can be opened from anywhere, and closing it always returns the user to Home.

## Tech Stack

- React Native (Expo)
- TypeScript
- Redux Toolkit
- React Navigation
- RTK Query

## Run the project

```bash
npm install
npx expo start