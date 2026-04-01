# DragonRadarZ App

DragonRadarZ is a React Native mobile application built with Expo that showcases Dragon Ball Z characters and planets through a visually rich and interactive interface. The app features a cinematic home screen with animated UI, background video, and smooth navigation between sections.

---

## Features

- Character listing using Dragon Ball API  
- Horizontal scrolling cards for characters  
- Cinematic home screen with background video  
- Smooth entry animations for UI elements  
- Parallax scrolling effect for depth experience  
- Explore Planets navigation  
- Characters and planets can be marked as favorites  
- Favorites are accessible in a dedicated tab  
- Character and planet detail screens  

---

## Tech Stack

- React Native (Expo)
- TypeScript
- React Navigation
- Expo AV (video background)
- React Native Animated API
- Expo Linear Gradient

---

## Installation

1. Clone the repository:

```
git clone <your-repo-url>
cd <project-folder>
```
2. Install dependencies:
```
npm install

```
3. Start the development server:
```
npx expo start
```
4. Run on device:
- Press a for Android emulator
- Press i for iOS simulator
- Scan QR code using Expo Go
  
## Project Structure
```
src/
 ├── components/
 │    ├── CharacterCard.tsx
 │    ├── ErrorView.tsx
 │    ├── Loader.tsx
 │    ├── PlanetCard.tsx
 │
 ├── screens/
 │    ├── HomeScreen.tsx
 │    ├── PlanetScreen.tsx
 │    ├── CharacterListScreen.tsx
 │    ├── CharacterDetailScreen.tsx
 │    ├── FavoritesScreen.tsx
 │    ├── PlanetDetailScreen.tsx
 │
 ├── hooks/
 │    ├── useCharacters.ts
 │
 ├── services/
 │    ├── api.ts
 │
 ├── types/
 │    ├── navigation.ts
 │    ├── character.ts

 ```
## Home Screen Highlights
- Background video using Expo AV
- Animated content falling from top
- Center logo with pulse animation
- Parallax scrolling for depth effect
- Horizontal character list
- Explore Planets button
- Gradient fade at the bottom to match theme

## API Used

Dragon Ball API
https://web.dragonball-api.com/

## Author
Developed as part of a custom anime-themed mobile application project.

## License
This project is intended for educational and personal use.

