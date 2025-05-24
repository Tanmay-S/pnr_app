# Indian Railway PNR Status Tracker App 🚆

A mobile application that fetches and displays PNR (Passenger Name Record) information from Indian Railways. This app is built with [Expo](https://expo.dev) and React Native.

## Features

- **PNR Status Tracking**: Enter your 10-digit PNR number to get detailed information about your booking
- **Train Information**: Browse and search for trains, view schedules and routes
- **Recent Searches**: Quick access to your recently checked PNR numbers
- **Favorite Trains**: Save your frequently used trains for quick access
- **User-friendly Interface**: Clean and intuitive UI designed for easy navigation

## Screenshots

(Screenshots would be added here after the app is built)

## Technology Stack

- **React Native**: For cross-platform mobile development
- **Expo**: Framework and platform for universal React applications
- **React Native Paper**: Material Design components for React Native
- **AsyncStorage**: For persistent local storage
- **React Navigation**: For navigation between screens

## Project Structure

```
app/
├── (tabs)/          # Tab-based navigation
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── screens/         # Main screen components
└── services/        # API and other services
```

## Getting Started

### Prerequisites

- Node.js (>= 14)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pnr-status-tracker.git
cd pnr-status-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npx expo start
```

## Running the App

- **Android**: Press 'a' in the terminal or use Android Emulator
- **iOS**: Press 'i' in the terminal or use iOS Simulator (requires macOS)
- **Web**: Press 'w' in the terminal

## Disclaimer

This app is built for demonstration purposes. In a real-world scenario, it would connect to the official Indian Railways API for live PNR data.

## License

MIT

## Acknowledgements

- Indian Railways for the inspiration
- Expo team for the amazing framework
- React Native community for continuous support

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
