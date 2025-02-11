import React from "react";
import { Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../Styles";
import { VStack, Image, Text, Pressable } from "native-base";
import kids_banner from "../data/banner_kids.png";
import men_banner from "../data/banner_mens.png";
import women_banner from "../data/banner_women.png";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

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
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
    >
      {/* Sales Text */}
      <Text
        style={{
          color: "#FFD700",
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        🔥 {t("Sales")} 🔥
      </Text>

      {/* Banner Swiper */}
      <Swiper
        loop
        autoplay
        autoplayTimeout={3}
        showsPagination
        dotStyle={{ backgroundColor: "gray" }}
        activeDotStyle={{ backgroundColor: "#FFD700" }}
        height={200}
      >
        {banners.map((banner, index) => (
          <Pressable
            key={index}
            onPress={() => handleBannerPress(banner.target)}
          >
            <Image
              source={typeof banner.image === "string" ? { uri: banner.image } : banner.image}
              height={200}
              width={width * 0.9}
              resizeMode="contain"
              alt={`Banner ${index + 1}`}
            />
          </Pressable>
        ))}
      </Swiper>
    </VStack>
  );
}
