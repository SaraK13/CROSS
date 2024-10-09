# Ionic (+Electron, Tauri) app for Cross Platform Development
This project is a cross-platform application built with **Ionic**, **Electron**, **Tauri**, and **Vite**.

## Prerequisites

Make sure you have the following tools installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) (LTS version)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Electron](https://www.electronjs.org/) (`npm install -g electron`)
- [Tauri](https://tauri.app/) (`cargo install tauri-cli`)
- [Vite](https://vitejs.dev/) (Vite is used as the build tool)

## Running the Project
- Running with Vite
```bash
npx vite --port=4000
```
This will start the Vite development server on http://localhost:4000.

- Running with Ionic
```bash
ionic serve
ionic cap run ios   # For iOS
ionic cap run android  # For Android

```
- Running with Ionic
```bash
npm run electron:start

```

- Running with Ionic
```bash
npm run tauri dev
```

## Building the Project
- Building for Production (Web)
```bash
npm run build
```

- Building for Electron (Desktop)
```bash
npm run electron:build
```
- Building for Tauri (Desktop)
```bash
npm run tauri build
```