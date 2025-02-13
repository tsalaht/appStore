import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { VStack, Image, Text, Pressable, Box } from "native-base";
import kids_banner from "../../assets/kiidsBanner.jpg";
import men_banner from "../../assets/menBanner.jpg";
import women_banner from "../../assets/womenBanner.jpg";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function Adds() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { t } = useTranslation();
  const navigation:any = useNavigation();

  const banners = [
    { image: kids_banner, target: { screen: "kid" } },
    { image: men_banner, target: { screen: "men" } },
    { image: women_banner, target: { screen: "women" } },
  ];

  const handleBannerPress = (target: { screen: string }) => {
    navigation.navigate("page two", target);
  };

  return (
    <VStack
      style={[
        styles.container,
        isDarkMode ? styles.darkBackground : styles.lightBackground,
      ]}
      space={4}
      alignItems="center"
      justifyContent="center"
    >
      {/* Sales Text */}
      <Animated.Text
        entering={FadeInUp.duration(800)}
        exiting={FadeOutDown.duration(600)}
        style={styles.salesText}
      >
         {t("Sales")} 
      </Animated.Text>

      {/* Banner Swiper */}
      <Box
        style={{
          width: "100%", // Full width of the screen
          borderRadius: 16,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Swiper
          loop
          autoplay
          autoplayTimeout={3}
          showsPagination
          dotStyle={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
          activeDotStyle={{ backgroundColor: "#FFD700" }}
          height={250}
        >
          {banners.map((banner, index) => (
            <Pressable
              key={index}
              onPress={() => handleBannerPress(banner.target)}
              style={styles.bannerContainer}
            >
              <Image
                source={typeof banner.image === "string" ? { uri: banner.image } : banner.image}
                alt={`Banner ${index + 1}`}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  darkBackground: {
    backgroundColor: "#121212",
  },
  lightBackground: {
    backgroundColor: "#f9f9f9",
  },
  salesText: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%", // Full width of the parent container
    height: 250,
    borderRadius: 16,
  },
});