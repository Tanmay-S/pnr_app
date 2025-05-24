# Indian Railway PNR Status Tracker App 🚆

A mobile application that fetches and displays PNR (Passenger Name Record) information from Indian Railways. This app is built with [Expo](https://expo.dev) and React Native.

## Features

- **PNR Status Tracking**: Enter your 10-digit PNR number to get detailed information about your booking
- **Train Information**: Browse and search for trains, view schedules and routes
- **Recent Searches**: Quick access to your recently checked PNR numbers with AsyncStorage persistence
- **Favorite Trains**: Save your frequently used trains for quick access
- **User-friendly Interface**: Clean and intuitive UI designed for easy navigation
- **Cross-platform**: Works on iOS, Android, and Web
- **Material Design**: Built with React Native Paper components
- **Type Safety**: Written in TypeScript
- **Comprehensive Testing**: 17/17 tests passing with Jest and React Native Testing Library

## Technology Stack

- **React Native 0.79.2**: For cross-platform mobile development
- **Expo SDK 53**: Framework and platform for universal React applications
- **React Native Paper**: Material Design components for React Native
- **AsyncStorage**: For persistent local storage
- **Expo Router**: For file-based navigation
- **TypeScript**: For type safety
- **Jest**: For unit testing

## Project Structure

```
app/
├── (tabs)/          # Tab-based navigation
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── screens/         # Main screen components
└── services/        # API and other services
__tests__/           # Test files
├── app/
│   ├── components/  # Component tests
│   ├── hooks/       # Hook tests
│   ├── screens/     # Screen tests
│   └── services/    # Service tests
├── mocks/           # Test mocks
└── utils/           # Test utilities
```

## Getting Started

### Prerequisites

- Node.js (>= 14)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pnr_app.git
cd pnr_app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

## Running the App

- **Android**: Press 'a' in the terminal or use Android Emulator
- **iOS**: Press 'i' in the terminal or use iOS Simulator (requires macOS)
- **Web**: Press 'w' in the terminal

## Available Scripts

- `npm start` - Start the Expo development server
- `npm test` - Run the test suite
- `npm run lint` - Run ESLint
- `npm run android` - Start on Android
- `npm run ios` - Start on iOS  
- `npm run web` - Start on Web

## Testing

The app includes comprehensive tests for all major components:

```bash
npm test
```

Test coverage includes:
- Component rendering and interactions
- Custom hooks functionality
- Service layer operations
- Error handling scenarios

## Features in Detail

### PNR Input Validation
- Validates 10-digit PNR numbers
- Real-time input validation
- Error messages for invalid inputs

### Recent Searches
- Automatically saves successful PNR searches
- Persistent storage using AsyncStorage
- Quick access to previous searches
- Remove individual searches

### Error Handling
- Network error handling
- User-friendly error messages
- Loading states during API calls

## Disclaimer

This app is built for demonstration purposes. In a real-world scenario, it would connect to the official Indian Railways API for live PNR data.

## License

MIT

## Acknowledgements

- Indian Railways for the inspiration
- Expo team for the amazing framework
- React Native community for continuous support