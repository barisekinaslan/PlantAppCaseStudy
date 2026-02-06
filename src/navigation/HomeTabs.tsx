import React, { useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import HomeScreen from "../features/home/screens/HomeScreen";
import PaywallScreen from "../features/onboarding/screens/PaywallScreen";
import PlaceholderScreen from "../features/home/screens/PlaceholderScreen";

export type HomeTabParamList = {
  HomeStack: undefined;
  Diagnose: undefined;
  Scan: undefined;
  MyGarden: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Paywall: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "card",
        contentStyle: { backgroundColor: "#0b1511" },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Paywall"
        component={PaywallScreen}
        options={{ presentation: "card", animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
}

export default function HomeTabs() {
  const homeIcon = useMemo(
    () => require("../../assets/images/home/homeIcon.png"),
    []
  );
  const diagnoseIcon = useMemo(
    () => require("../../assets/images/home/diagnoseIcon.png"),
    []
  );
  const scanIcon = useMemo(
    () => require("../../assets/images/home/scanIcon.png"),
    []
  );
  const gardenIcon = useMemo(
    () => require("../../assets/images/home/gardenIcon.png"),
    []
  );
  const profileIcon = useMemo(
    () => require("../../assets/images/home/profileIcon.png"),
    []
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: "#28AF6E",
        tabBarInactiveTintColor: "rgba(19,35,27,0.35)",
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
          const isPaywall = routeName === "Paywall";

          return {
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => (
              <Image
                source={homeIcon}
                style={[styles.icon, { opacity: focused ? 1 : 0.45 }]}
              />
            ),
            // Hide the tab bar when Paywall is the focused screen inside HomeStack
            tabBarStyle: isPaywall ? { display: "none" } : styles.tabBar,
          };
        }}
      />
      <Tab.Screen
        name="Diagnose"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={diagnoseIcon}
              style={[styles.icon, { opacity: focused ? 1 : 0.45 }]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.scanBtn}>
              <Image source={scanIcon} style={styles.scanIcon} />
            </View>
          ),
          tabBarButton: (props) => {
            const { delayLongPress, ...rest } = props as any;
            return (
              <TouchableOpacity
                {...rest}
                delayLongPress={delayLongPress ?? undefined}
                activeOpacity={0.9}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="MyGarden"
        component={PlaceholderScreen}
        options={{
          tabBarLabel: "My Garden",
          tabBarIcon: ({ focused }) => (
            <Image
              source={gardenIcon}
              style={[styles.icon, { opacity: focused ? 1 : 0.45 }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={PlaceholderScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={profileIcon}
              style={[styles.icon, { opacity: focused ? 1 : 0.45 }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 88,
    paddingTop: 10,
    paddingBottom: 22,
    borderTopWidth: 1,
    borderTopColor: "rgba(19,35,27,0.08)",
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: "#28AF6E",
  },

  scanBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#28AF6E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -34, // floating
    shadowOpacity: 0.15,
    elevation: 3,
  },
  scanIcon: {
    width: 26,
    height: 26,
    tintColor: "#FFFFFF",
  },
});