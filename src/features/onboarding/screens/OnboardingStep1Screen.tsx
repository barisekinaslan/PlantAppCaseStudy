import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../navigation/OnboardingStack";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Step1">;

// Figma base (375x812)
const FIGMA_W = 375;
const FIGMA_H = 812;

const { width: W, height: H } = Dimensions.get("window");
const s = W / FIGMA_W;
const v = H / FIGMA_H;

export default function OnboardingStep1Screen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Background glow */}
      <Image
        source={require("../../../../assets/images/onboarding/onboardingBackgroundImage.png")}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.titleRegular}>Take a photo to </Text>
          <Text style={styles.titleBold}>identify</Text>
          <Text style={styles.titleRegular}>{"\n"}the plant!</Text>
        </Text>

        {/* Brush underline (under "identify") */}
        <Image
          source={require("../../../../assets/images/onboarding/brushImage.png")}
          style={styles.brush}
          resizeMode="contain"
        />
      </View>

      {/* Hero (bigger) */}
      <Image
        source={require("../../../../assets/images/onboarding/onboardingOneImage.png")}
        style={styles.hero}
        resizeMode="contain"
      />

      {/* CTA */}
      <Pressable style={styles.button} onPress={() => navigation.navigate("Step2")}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

      {/* Pagination dots (active dot bigger) */}
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FBF9",
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },

  header: {
    position: "absolute",
    left: 24 * s,
    top: 78 * v,
    width: 327 * s,
  },

  // Title base
  title: {
    color: "#13231B",
    fontSize: 28 * s,
    lineHeight: 34 * s,
    letterSpacing: 0.07,
  },

  // Only "identify" is bold, rest regular
  titleRegular: {
    fontFamily: "Rubik-Regular",
  },
  titleBold: {
    fontFamily: "Rubik-Bold",
  },

  // Brush position (under the word "identify")
  brush: {
    position: "absolute",
    // "identify" roughly starts after "Take a photo to " -> tune a bit like Figma
    left: 182 * s,
    top: 34 * v,
    width: 150 * s,
    height: 18 * v,
  },

  // Make the hero bigger & closer to Figma
  hero: {
    position: "absolute",
    left: -8 * s,
    top: 158 * v,
    width: 392 * s,
    height: 560 * v,
  },

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

  dots: {
    position: "absolute",
    top: (667 + 56 + 20) * v,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D1E5DB",
  },

  // Active dot bigger + dark
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#13231B",
  },
});