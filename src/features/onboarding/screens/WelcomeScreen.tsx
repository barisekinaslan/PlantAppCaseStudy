import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../navigation/OnboardingStack";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Welcome">;

// Figma base (375x812)
const FIGMA_W = 375;
const FIGMA_H = 812;

const { width: W, height: H } = Dimensions.get("window");
const s = W / FIGMA_W;
const v = H / FIGMA_H;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Background glow (Figma) */}
      <Image
        source={require("../../../../assets/images/onboarding/onboardingBackgroundImage.png")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.titleLight}>Welcome to </Text>
          <Text style={styles.titleBrand}>PlantApp</Text>
        </Text>

        <Text style={styles.subtitle}>
          Identify more than 3000+ plants and{"\n"}88% accuracy.
        </Text>
      </View>

      {/* Hero */}
      <Image
        source={require("../../../../assets/images/onboarding/getStartedImage.png")}
        style={styles.hero}
        resizeMode="contain"
      />

      {/* CTA */}
      <Pressable style={styles.button} onPress={() => navigation.navigate("Step1")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>

      {/* Footer */}
      <Text style={styles.footer}>
        By tapping next, you are agreeing to PlantID{"\n"}
        <Text style={styles.link}>Terms of Use</Text> &{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBF9",
  },

  // Make sure glow covers whole screen
  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  // Figma: left 24, top 59, width 300, height 85
  header: {
    position: "absolute",
    left: 24 * s,
    top: 59 * v,
    width: 300 * s,
    height: 85 * v,
  },

  // Figma: Rubik 28px, line-height 100%, letter spacing 0.07, color #13231B
  title: {
    color: "#13231B",
    fontSize: 28 * s,
    lineHeight: 28 * s,
    letterSpacing: 0.07,
  },
  // "Welcome to" -> Rubik Light (300)
  titleLight: {
    fontFamily: "Rubik-Light",
  },
  // "PlantApp" -> More bold (use ExtraBold)
  titleBrand: {
    fontFamily: "Rubik-ExtraBold",
  },

  // Figma: Rubik 16px, line-height 22px, letter spacing 0.07, #13231B 70%
  subtitle: {
    marginTop: 8 * v,
    width: 300 * s,
    height: 44 * v,
    color: "rgba(19, 35, 27, 0.7)",
    fontSize: 16 * s,
    lineHeight: 22 * v,
    letterSpacing: 0.07,
    fontFamily: "Rubik-Regular",
  },

  // Figma: top 168, width 375, height 499
  hero: {
    position: "absolute",
    left: 0,
    top: 168 * v,
    width: 375 * s,
    height: 499 * v,
  },

  // Figma: left 24, top 667, width 327, height 56, radius 12, color #28AF6E
  button: {
    position: "absolute",
    left: 24 * s,
    top: 667 * v,
    width: 327 * s,
    height: 56 * v,
    borderRadius: 12 * s,
    backgroundColor: "#28AF6E",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16 * s,
    fontFamily: "Rubik-Medium",
  },

  footer: {
    position: "absolute",
    left: 24 * s,
    width: 327 * s,
    top: (667 + 56 + 12) * v,
    textAlign: "center",
    fontSize: 12 * s,
    lineHeight: 16 * v,
    color: "rgba(19, 35, 27, 0.45)",
    fontFamily: "Rubik-Regular",
  },

  link: {
    textDecorationLine: "underline",
    color: "rgba(19, 35, 27, 0.45)",
  },
});