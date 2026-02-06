import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "../../../state/hooks";
import { setOnboardingCompleted } from "../onboardingSlice";

const { width, height } = Dimensions.get("window");

export default function PaywallScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const bgSource = useMemo(
    () => require("../../../../assets/images/paywall/paywallBackgroundImage.png"),
    []
  );

  const unlimitedIcon = useMemo(
    () => require("../../../../assets/images/paywall/unlimitedIcon.png"),
    []
  );
  const fasterIcon = useMemo(
    () => require("../../../../assets/images/paywall/fasterIcon.png"),
    []
  );
  const leavesIcon = useMemo(
    () => require("../../../../assets/images/paywall/leavesIcon.png"),
    []
  );

const handleClose = () => {

  dispatch(setOnboardingCompleted(true));

  const state = navigation.getState?.();
  const isHomeStack = state?.routeNames?.includes("Home");

  if (isHomeStack) {
    navigation.popToTop();
  }
};

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.root}>
        {/* Background image (zoom-out + yukarı) */}
        <ImageBackground
          source={bgSource}
          style={styles.bg}
          resizeMode="cover"
          imageStyle={styles.bgImage}
        />

        {/* Close */}
        <TouchableOpacity
          onPress={handleClose}
          style={[styles.closeBtn, { top: insets.top + 10 }]}
          activeOpacity={0.85}
          hitSlop={10}
        >
          <Text style={styles.closeX}>×</Text>
        </TouchableOpacity>

        {/* CONTENT FLOW */}
        <View style={styles.content}>
          {/* Header (daha yukarı) */}
          <View style={styles.header}>
            <Text style={styles.title}>
              <Text style={styles.titleBold}>PlantApp </Text>
              <Text style={styles.titleLight}>Premium</Text>
            </Text>
            <Text style={styles.subtitle}>Access All Features</Text>
          </View>

          {/* Feature cards (daha kare + daha yüksek) */}
          <View style={styles.cardsWrap}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.cardsRow}
            >
              <View style={styles.card}>
                <View style={styles.iconBox}>
                  <Image source={unlimitedIcon} style={styles.cardIcon} />
                </View>
                <Text style={styles.cardTitle}>Unlimited</Text>
                <Text style={styles.cardSub}>Plant Identify</Text>
              </View>

              <View style={styles.card}>
                <View style={styles.iconBox}>
                  <Image source={fasterIcon} style={styles.cardIcon} />
                </View>
                <Text style={styles.cardTitle}>Faster</Text>
                <Text style={styles.cardSub}>Process</Text>
              </View>

              <View style={styles.card}>
                <View style={styles.iconBox}>
                  <Image source={leavesIcon} style={styles.cardIcon} />
                </View>
                <Text style={styles.cardTitle}>Detailed</Text>
                <Text style={styles.cardSub}>Plant Care</Text>
              </View>
            </ScrollView>
          </View>

          {/* Bottom (SafeArea ile taşma çözümü) */}
          <View style={[styles.bottom, { paddingBottom: insets.bottom + 12 }]}>
            <TouchableOpacity
              style={[styles.plan, selectedPlan === "monthly" && styles.planActive]}
              onPress={() => setSelectedPlan("monthly")}
              activeOpacity={0.9}
            >
              <View
                style={[
                  styles.radioOuter,
                  selectedPlan === "monthly" && styles.radioOuterActive,
                ]}
              >
                {selectedPlan === "monthly" && (
                  <View style={styles.radioInner}>
                    <View style={styles.radioDot} />
                  </View>
                )}
              </View>

              <View style={styles.planTextWrap}>
                <Text style={styles.planTitle}>1 Month</Text>
                <Text style={styles.planSub}>$2.99/month, auto renewable</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.plan, selectedPlan === "yearly" && styles.planActive]}
              onPress={() => setSelectedPlan("yearly")}
              activeOpacity={0.9}
            >
              <View
                style={[
                  styles.radioOuter,
                  selectedPlan === "yearly" && styles.radioOuterActive,
                ]}
              >
                {selectedPlan === "yearly" && (
                  <View style={styles.radioInner}>
                    <View style={styles.radioDot} />
                  </View>
                )}
              </View>

              <View style={styles.planTextWrap}>
                <Text style={styles.planTitle}>1 Year</Text>
                <Text style={styles.planSub}>First 3 days free, then $529.99/year</Text>
              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>Save 50%</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cta} onPress={handleClose} activeOpacity={0.9}>
              <Text style={styles.ctaText}>Try free for 3 days</Text>
            </TouchableOpacity>

            <Text style={styles.legal}>
              After the 3-day free trial period you'll be charged ₺274.99 per year unless you
              cancel before the trial expires. Yearly Subscription is Auto-Renewable
            </Text>

            <Text style={styles.links}>Terms • Privacy • Restore</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0b1511" },
  root: { flex: 1 },

  // Background (zoom-out hissi için: container geniş + scale biraz düşük + yukarı)
  bg: {
    position: "absolute",
    top: 0,
    left: -72,
    right: -72,
    height: height * 0.82,
  },
  bgImage: {
    transform: [{ scale: 0.96 }, { translateY: -78 }],
  },

  // Close
  closeBtn: {
    position: "absolute",
    right: 18,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "rgba(0,0,0,0.75)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  closeX: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
    includeFontPadding: false,
  },

  // Flow
  content: {
    flex: 1,
  },

  // Header (daha yukarı)
  header: {
    marginTop: height * 0.30,
    marginHorizontal: 24,
  },
  title: {},
  titleBold: { fontFamily: "Rubik-Bold", fontSize: 32, color: "#fff" },
  titleLight: { fontFamily: "Rubik-Light", fontSize: 32, color: "#fff" },
  subtitle: {
    marginTop: 6,
    fontFamily: "Rubik-Light",
    fontSize: 16,
    color: "rgba(255,255,255,0.70)",
  },

  // Cards
  cardsWrap: {
    marginTop: 18,
    height: 130,
  },
  cardsRow: {
    paddingLeft: 24,
    paddingRight: 32,
    paddingBottom: 8,
    alignItems: "stretch",
  },
  card: {
    width: width * 0.42,
    height: 128,
    marginRight: 14,
    borderRadius: 20,
    padding: 16,
    backgroundColor: "rgba(20,40,30,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardIcon: { width: 18, height: 18, tintColor: "#fff" },
  cardTitle: { fontFamily: "Rubik-SemiBold", fontSize: 18, color: "#fff" },
  cardSub: {
    marginTop: 4,
    fontFamily: "Rubik-Light",
    fontSize: 12,
    color: "rgba(255,255,255,0.70)",
  },

  // Bottom
  bottom: {
    marginTop: "auto",
    marginHorizontal: 24,
  },

  // Plans
  plan: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.32)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    marginBottom: 12,
    position: "relative",
  },
  planActive: {
    borderWidth: 1.5,
    borderColor: "#28AF6E",
    backgroundColor: "rgba(40,175,110,0.10)",
  },
  planTextWrap: {
    flex: 1,
    paddingRight: 84, // badge alanı
  },

  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.22)",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  radioOuterActive: {
    borderColor: "#28AF6E",
    backgroundColor: "rgba(40,175,110,0.18)",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#28AF6E",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ffffff",
    opacity: 0.9,
  },

  planTitle: {
    fontFamily: "Rubik-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  planSub: {
    marginTop: 2,
    fontFamily: "Rubik-Light",
    fontSize: 12,
    color: "rgba(255,255,255,0.70)",
  },

  // Badge (Figma’ya daha yakın: sağ üst pill)
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#28AF6E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: "#fff",
    fontFamily: "Rubik-Medium",
    fontSize: 10,
    includeFontPadding: false,
  },

  // CTA + Legal
  cta: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#28AF6E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  ctaText: { color: "#fff", fontFamily: "Rubik-SemiBold", fontSize: 16 },

  legal: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 14,
    color: "rgba(255,255,255,0.60)",
    fontFamily: "Rubik-Light",
  },
  links: {
    marginTop: 8,
    textAlign: "center",
    color: "rgba(255,255,255,0.60)",
    fontFamily: "Rubik-Regular",
    fontSize: 11,
  },
});