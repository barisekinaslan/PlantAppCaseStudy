import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useGetCategoriesQuery } from "../../../services/api/categoriesApi";
import { useGetQuestionsQuery } from "../../../services/api/questionsApi";

const { width } = Dimensions.get("window");

type Category = {
  id: number;
  title: string;
  rank: number;
  image?: { url?: string } | null;
};

type Question = {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const headerBg = useMemo(
    () => require("../../../../assets/images/home/headerBackgroundImage.png"),
    []
  );
  const searchIcon = useMemo(
    () => require("../../../../assets/images/home/searchIcon.png"),
    []
  );
  const mailIcon = useMemo(
    () => require("../../../../assets/images/home/mailIcon.png"),
    []
  );
  const arrowIcon = useMemo(
    () => require("../../../../assets/images/home/arrowIcon.png"),
    []
  );

  const { data: categoriesRaw, isLoading: catLoading, error: catError } =
    useGetCategoriesQuery();
  const { data: questionsRaw, isLoading: qLoading, error: qError } =
    useGetQuestionsQuery();

  // categoriesRaw shape could be:
  // 1) { data: Category[] }  (your payload)
  // 2) Category[]
  const categories: Category[] =
    (categoriesRaw as any)?.data?.data ??
    (categoriesRaw as any)?.data ??
    (Array.isArray(categoriesRaw) ? (categoriesRaw as any) : []);

  const questions: Question[] = Array.isArray(questionsRaw)
    ? (questionsRaw as any)
    : [];

  const sortedCategories = useMemo(() => {
    return [...categories].sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0));
  }, [categories]);

  const sortedQuestions = useMemo(() => {
    return [...questions].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [questions]);

  const renderGetStarted = ({ item }: { item: Question }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.gsCard}>
        <ImageBackground
          source={{ uri: item.image_uri }}
          style={styles.gsBg}
          imageStyle={styles.gsBgImg}
        >
          <View style={styles.gsOverlay} />
          <Text style={styles.gsTitle} numberOfLines={3}>
            {item.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderCategory = ({ item }: { item: Category }) => {
    const uri = item.image?.url;

    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.catCard}>
        <Text style={styles.catTitle} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.catImageWrap}>
          {uri ? (
            <Image
              source={{ uri }}
              style={styles.catImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.catImagePlaceholder} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 12,
        }}
      >
        {/* Header */}
        {/* ✅ daha yukarı: paddingTop düşürdük */}
        <View style={[styles.header, { paddingTop: 6 }]}>
          <Text style={styles.hi}>Hi, plant lover!</Text>

          <View style={styles.bigRow}>
            <Text style={styles.big}>Good Afternoon!</Text>
            <Text style={styles.bigEmoji}>☁️</Text>
          </View>

          <ImageBackground
            source={headerBg}
            style={styles.searchBg}
            imageStyle={styles.searchBgImg}
            resizeMode="stretch"
          >
            <View style={styles.searchBarWrap}>
              <View style={styles.searchBar}>
                <Image source={searchIcon} style={styles.searchIcon} />
                <TextInput
                  placeholder="Search for plants"
                  placeholderTextColor="rgba(18, 32, 25, 0.35)"
                  style={styles.searchInput}
                />
              </View>
            </View>
          </ImageBackground>

          {/* Premium banner */}
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.premium}
            onPress={() => navigation.navigate("Paywall")}
          >
            <View style={styles.mailWrap}>
              <Image source={mailIcon} style={styles.mailIcon} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.premiumTitle}>FREE Premium Available</Text>
              <Text style={styles.premiumSub}>Tap to upgrade your account!</Text>
            </View>

            <Image source={arrowIcon} style={styles.arrow} />
          </TouchableOpacity>
        </View>

        {/* Get Started */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Started</Text>

          {qLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : qError ? (
            <Text style={styles.loadingText}>Questions error</Text>
          ) : (
            <FlatList
              horizontal
              data={sortedQuestions}
              renderItem={renderGetStarted}
              keyExtractor={(it) => String(it.id)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.gsRow}
            />
          )}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          {catLoading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : catError ? (
            <Text style={styles.loadingText}>Categories error</Text>
          ) : (
            <FlatList
              data={sortedCategories}
              renderItem={renderCategory}
              keyExtractor={(it) => String(it.id)}
              numColumns={2}
              scrollEnabled={false}
              columnWrapperStyle={styles.catRow}
              contentContainerStyle={{ paddingBottom: 8 }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const H_PADDING = 24;
const GAP = 14;
const CAT_W = (width - H_PADDING * 2 - GAP) / 2;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    paddingHorizontal: 12,
  },

  // 1) yazılar daha yukarı + Good Afternoon küçülsün
  hi: {
    fontFamily: "Rubik-Regular",
    fontSize: 14,
    color: "#2D3B34",
    opacity: 0.9,
    marginBottom: 0,
  },
  bigRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 6,
  },
  big: {
    fontFamily: "Rubik-Bold",
    fontSize: 32,
    color: "#13231B",
    letterSpacing: -0.4,
  },
  bigEmoji: {
    marginLeft: 8,
    fontSize: 18,
    opacity: 0.65,
  },

  // 2) search bar yukarı geldi zaten; bg daha düzgün
  searchBg: {
    width: "100%",
    height: 66,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "center",
    marginBottom: 12,
  },
  searchBgImg: {
    opacity: 1,
    // NOTE: no transform here; stretch will keep the left/right plants visible
  },
  searchBarWrap: {
    width: "100%",
    alignItems: "center",
  },
  searchBar: {
    width: "86%",
    height: 48,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.84)",
    borderWidth: 1,
    borderColor: "rgba(19,35,27,0.10)",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: "rgba(19,35,27,0.35)",
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Rubik-Regular",
    fontSize: 15,
    color: "#13231B",
  },

  premium: {
    height: 72,
    borderRadius: 18,
    backgroundColor: "#232323",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  mailWrap: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  mailIcon: {
    width: 34,
    height: 34,
  },
  premiumTitle: {
    fontFamily: "Rubik-Bold",
    fontSize: 15,
    color: "#F2C94C",
    marginBottom: 2,
  },
  premiumSub: {
    fontFamily: "Rubik-Regular",
    fontSize: 12,
    color: "#F2C94C",
  },
  arrow: {
    width: 18,
    height: 18,
    tintColor: "rgba(255,255,255,0.70)",
    marginLeft: 10,
  },

  section: {
    paddingHorizontal: H_PADDING,
    marginTop: 2,
  },

  // 4) Get started daha küçük
  sectionTitle: {
    fontFamily: "Rubik-Bold",
    fontSize: 18,
    color: "#13231B",
    marginBottom: 10,
  },
  loadingText: {
    fontFamily: "Rubik-Regular",
    color: "rgba(19,35,27,0.55)",
    marginBottom: 12,
  },

  // Get Started cards (küçült)
  gsRow: {
    paddingRight: 10,
    paddingBottom: 10,
  },
  gsCard: {
    width: width * 0.70,
    height: 160,
    borderRadius: 22,
    overflow: "hidden",
    marginRight: 14,
  },
  gsBg: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  gsBgImg: {
    borderRadius: 22,
  },
  gsOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.34)",
  },
  gsTitle: {
    fontFamily: "Rubik-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    lineHeight: 26,
  },

  // Categories grid
  catRow: {
    justifyContent: "space-between",
    marginBottom: 14,
  },
  catCard: {
    width: CAT_W,
    height: 132,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(19,35,27,0.10)",
    backgroundColor: "#FFFFFF",
    padding: 16,
    overflow: "hidden",
  },
  catTitle: {
    fontFamily: "Rubik-Bold",
    fontSize: 16,
    color: "#13231B",
    lineHeight: 20,
  },

  // 5) Yeşil background KALDIRILDI
  catImageWrap: {
    position: "absolute",
    right: 8,
    bottom: 6,
    width: 92,
    height: 92,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: "visible",
  },
  catImage: {
    width: 96,
    height: 96,
  },
  catImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: "rgba(19,35,27,0.06)",
  },
});