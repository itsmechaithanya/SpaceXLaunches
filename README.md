# SpaceX Launch Tracker

## Overview
SpaceX Launch Tracker is a mobile application designed to provide users with up-to-date information about SpaceX launches. The app fetches real-time data from the SpaceX API and displays details about past and upcoming launches, including mission names, dates, and rocket information. Users can also like and unlike their favorite launches.

## Features
- **View SpaceX Launches:** Displays all SpaceX launches sorted by date.
- **Filter by Timeframe:** Users can filter launches into "All," "Past," and "Upcoming" categories.
- **Detailed Launch Information:** Users can tap on a launch to view more details.
- **Like/Dislike Feature:** Users can mark launches as liked, which can later be unliked.
- **Bottom Navigation:** Provides easy access to different sections of the app.
- **Optimized UI/UX:** Smooth and interactive UI developed with React Native.

## Figma Design
Before starting the development, a prototype of the app was first created in **Figma** to structure the user experience and interface efficiently. You can view the design prototype here:  
[Figma Prototype](https://www.figma.com/design/E8dl61fAaRSTGnTOpbYKqa/Untitled?node-id=0-1&t=tXQE4KVhKEKMv1vA-1)

## Tech Stack
- **React Native** - Framework for building mobile applications.
- **React Navigation** - Used for handling navigation within the app.
- **Context API** - Manages the global state for user interactions.
- **SpaceX API** - Provides launch data.
- **Fetch API** - Retrieves SpaceX launch data dynamically.
- **React Hooks** - Manages component state and side effects.

## Installation & Setup
### Prerequisites
Ensure you have the following installed on your system:
- Node.js & npm
- React Native CLI
- Android Studio (for Android Emulator) or Xcode (for iOS Simulator)

### Steps to Run the App
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```sh
   cd spaceX-launch-tracker
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start Metro Bundler:
   ```sh
   npx react-native start
   ```
5. Run the app on Android:
   ```sh
   npx react-native run-android
   ```
6. Run the app on iOS:
   ```sh
   npx react-native run-ios
   ```

## Project Structure
```
📂 spaceX-launch-tracker
│── 📁 src
│   │── 📄 App.js (Main entry point)
│   │── 📄 BottomNav.js (Bottom navigation component)
│   │── 📄 Favorites.js (Liked launches screen)
│   │── 📄 FavoritesContext.js (Global state for liked launches)
│   │── 📄 home.js (Home screen with launch list)
│   │── 📄 details.js (Launch details screen)
│   │── 📄 rockets.js (Rocket information screen)
│   │── 📄 welcome.js (Initial screen for onboarding)
│── 📄 package.json
│── 📄 README.md
```

## API Integration
This app fetches data from the [SpaceX API](https://api.spacexdata.com/v4/launches) to retrieve launch information. The API provides details such as mission names, launch dates, rocket details, and images.

## Future Enhancements
- **Dark Mode Support**
- **Push Notifications for Upcoming Launches**
- **Search Functionality**
- **Offline Mode to Save Favorite Launches Locally**

## Contribution
If you’d like to contribute, follow these steps:
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your fork and submit a Pull Request.

## License
This project is open-source and available under the MIT License.

