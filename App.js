// App.js
import React from "react";
import { View } from "react-native";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import screens
import WelcomeScreen from "./welcome";
import Home from "./home";
import Details from "./details";
import Rockets from "./rockets";
import Favorites from "./Favorites";
import BottomNav from "./BottomNav";

// Import the FavoritesProvider for context
import { FavoritesProvider } from "./FavoritesContext";

const Stack = createStackNavigator();

// This wrapper will conditionally render the bottom navigation bar
function BottomNavWrapper() {
  // Safely access navigation state
  const state = useNavigationState((state) => state);
  if (!state || !state.routes || state.routes.length === 0) return null;
  const routeName = state.routes[state.index].name;
  // Hide BottomNav on the Welcome screen
  if (routeName === "Welcome") return null;
  return <BottomNav />;
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="Rockets" component={Rockets} />
            <Stack.Screen name="Favorites" component={Favorites} />
          </Stack.Navigator>
          <BottomNavWrapper />
        </View>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
