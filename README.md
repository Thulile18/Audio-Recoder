# Voice Notes

A voice journal app built with React Native, Expo and TypeScript. You can record voice notes, play them back, rename them, search them and delete them. Everything is stored on the device, so the app works offline.

## Features

- Record voice notes with the microphone
- Microphone permission handling
- List of notes showing the date, time and length of each one
- Playback with play, pause, stop and speed control
- Current time and total duration shown during playback
- Rename and delete notes
- Search notes by name
- Notes are kept after the app is closed or restarted
- Works offline
- Feedback and Support button

## Built With

- React Native and Expo
- TypeScript
- expo-audio for recording and playback
- expo-file-system for saving audio files
- AsyncStorage for saving the list of notes

## How Data Is Stored

When a recording stops, the audio file is copied into the app's documents folder. The name, file name, length and date of each note are saved in AsyncStorage. When the app opens, it loads the list and finds each audio file by its file name.

## Project Structure

```
App.tsx
index.ts
src/
  constants/    theme, settings and texts
  types/        the VoiceNote type
  utils/        time formatting
  services/     saving, loading and deleting
  components/   search bar, note item, player, record button, rename window, feedback button
  screens/      home screen
```

## Running the App

Install the packages:

```
npm install
npx expo install --fix
```

Start the app:

```
npx expo start
```

Open Expo Go on your phone and scan the QR code. Recording needs a real phone, so do not test it in a browser.

## Building an Installable App

Run these commands from the project folder:

```
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

To get an installable apk file, set the build type to apk in the preview profile of eas.json. When the build finishes, EAS gives you a link to download the app.

## Permissions

The app asks for microphone access the first time it opens. This is needed to record voice notes.

## Not Included

The optional recording quality settings and the backup and restore feature are not included.

## Support

Use the Feedback and Support button inside the app to send an email.
