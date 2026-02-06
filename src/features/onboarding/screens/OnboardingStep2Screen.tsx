import React from "react";
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../../navigation/OnboardingStack";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../../navigation/RootNavigator";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Step2">;

// Figma base (375x812)
const FIGMA_W = 375;
const FIGMA_H = 812;

const { width: W, height: H } = Dimensions.get("window");
const s = W / FIGMA_W;
const v = H / FIGMA_H;

export default function OnboardingStep2Screen({ navigation }: Props) {
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      {/* Background (step2 specific) */}
      <Image
        source={require("../../../../assets/images/onboarding/onboardingTwoBackgroundImage.png")}
        style={styles.background}
        resizeMode="contain"
      />
      {/* Soft overlay to mimic Figma glow */}
      <View style={styles.backgroundOverlay} />

      {/* Title + brush */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.titleLight}>Get plant </Text>
          <Text style={styles.titleExtraBold}>care guides</Text>
        </Text>

        <Image
          source={require("../../../../assets/images/onboarding/brushImage.png")}
          style={styles.brush}
          resizeMode="contain"
        />
      </View>

      {/* Main hero phone */}
      <Image
        source={require("../../../../assets/images/onboarding/onboardingTwoImage.png")}
        style={styles.hero}
        resizeMode="contain"
      />

      {/* Artwork cards (bigger + repositioned) */}
      <Image
        source={require("../../../../assets/images/onboarding/artworkImage.png")}
        style={styles.artwork}
        resizeMode="contain"
      />

      {/* CTA */}
      <Pressable
        style={styles.button}
        onPress={() => rootNav.navigate("Paywall", { source: "onboarding" })}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>

      {/* Pagination dots (middle active) */}
      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
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

  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.10)", // glow softener
  },

  header: {
    position: "absolute",
    left: 24 * s,
    top: 78 * v,
    width: 327 * s,
  },

  title: {
    color: "#13231B",
    fontSize: 28 * s,
    lineHeight: 34 * s,
    letterSpacing: 0.07,
  },

  // Get plant = lighter
  titleLight: {
    fontFamily: "Rubik-Regular",
  },

  // care guides = extra bold
  titleExtraBold: {
    fontFamily: "Rubik-ExtraBold",
  },

  brush: {
    position: "absolute",
    left: 132 * s,
    top: 34 * v,
    width: 175 * s,
    height: 18 * v,
  },

  hero: {
    position: "absolute",
    left: -10 * s,
    top: 155 * v,
    width: 395 * s,
    height: 560 * v,
  },

artwork: {
  position: "absolute",
  right: -17 * s,
  top: 84 * v,
  width: 345 * s,
  height: 290 * v,
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

  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#13231B",
  },
});