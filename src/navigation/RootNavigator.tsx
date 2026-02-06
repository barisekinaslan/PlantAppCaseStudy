import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "../state/hooks";
import OnboardingStack from "./OnboardingStack";
import HomeTabs from "./HomeTabs";
import PaywallScreen from "../features/onboarding/screens/PaywallScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  HomeTabs: undefined;
  Paywall: { source?: "onboarding" | "home" } | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const completed = useAppSelector((s) => s.onboarding.completed);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {completed ? (
          <RootStack.Screen name="HomeTabs" component={HomeTabs} />
        ) : (
          <RootStack.Screen name="Onboarding" component={OnboardingStack} />
        )}

        {/* ✅ Global Paywall (her yerden açılabilir) */}
        <RootStack.Screen
          name="Paywall"
          component={PaywallScreen}
          options={{ presentation: "modal" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}