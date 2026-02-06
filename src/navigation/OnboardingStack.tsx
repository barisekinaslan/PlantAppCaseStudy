import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../features/onboarding/screens/WelcomeScreen";
import OnboardingStep1Screen from "../features/onboarding/screens/OnboardingStep1Screen";
import OnboardingStep2Screen from "../features/onboarding/screens/OnboardingStep2Screen";
import PaywallScreen from "../features/onboarding/screens/PaywallScreen";

export type OnboardingStackParamList = {
  Welcome: undefined;
  Step1: undefined;
  Step2: undefined;
  Paywall: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "card",          // ✅ modal değil, normal push
        animation: "slide_from_right", // iOS default push animasyonu
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Step1" component={OnboardingStep1Screen} />
      <Stack.Screen name="Step2" component={OnboardingStep2Screen} />
      <Stack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{
          presentation: "card",        // ekstra garanti
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}