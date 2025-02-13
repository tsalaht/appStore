import React, { useEffect, useState } from "react";
import { View, Dimensions, ActivityIndicator, Image, Text as RNText } from "react-native";
import Swiper from "react-native-swiper";
import NetInfo from "@react-native-community/netinfo";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchAllProducts } from "../../store/features/productsSlice";
import { useTranslation } from "react-i18next";
import styles from "../Styles";
import { VStack, Text, Stack } from "native-base";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.9;

export default function NewProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { products: productsData, status } = useSelector((state: any) => state.products);

  // State to track network connectivity
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // Fetch products on mount
    dispatch(fetchAllProducts());

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  // console.log("Fetched products:", productsData);

  const displayedProducts = Array.isArray(productsData?.products)
    ? productsData.products
    : [];

  if (!isConnected) {
    return (
      <View
        style={[
          styles.mainContainer,
          isDarkMode ? styles.darkBckground : styles.lightBckground,
        ]}
      >
        <VStack w={"full"} alignItems={"center"} justifyContent={"center"} mt={50}>
          <RNText style={{ color: isDarkMode ? "#fff" : "#000", fontSize: 18 }}>
            {t("No Connection")}
          </RNText>
        </VStack>
      </View>
    );
  }

  if (status === "loading") {
    return <ActivityIndicator size="large" color="#FFD700" />;
  }

  return (
    <View
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
    >
      {/* Title Section */}
      <VStack w={"full"} alignItems={"center"} justifyContent={"center"} mb={12}>
        <Text
          style={[
            isDarkMode ? styles.darkText : styles.lightText,
            { fontSize: 20, marginBottom: 16, textAlign: i18n.language === "ar" ? "right" : "left" },
          ]}
        >
          <Text style={{ color: "#FFD700" }}>{t("New")}</Text> {t("Products")}
        </Text>
        <Stack width={"20%"} h={1.5} bg={"#FFD700"} rounded={4}></Stack>
      </VStack>

      {/* Swiper Component */}
      {displayedProducts.length > 0 ? (
        <Swiper
          showsButtons={false}
          autoplay={true}
          horizontal={true}
          loop={true}
          containerStyle={{
            height: 300,
            width: "100%",
          }}
          dot={<View style={{ backgroundColor: "#ccc", width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 }} />}
          activeDot={<View style={{ backgroundColor: "#FFD700", width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 }} />}
        >
          {displayedProducts.map((item: any) => {
            let images: string[] = [];
            try {
              images = JSON.parse(item.images); // Convert string to array
            } catch (error) {
              console.error("Error parsing images:", error);
            }
            const imageUrl = images.length
              ? `https://rayyehbalak.com/api/prudact/${item.id}/img/${images[0]}`
              : "https://via.placeholder.com/300"; // Default image if none found

            return (
              <View key={item.id} style={{ width: CARD_WIDTH, alignItems: "center", justifyContent: "center" }}>
                <Image
                  source={{ uri: imageUrl }}
                  style={{ width: "100%", height: 200, borderRadius: 10 }}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    color: isDarkMode ? "#fff" : "#000",
                    fontSize: 16,
                    textAlign: "center",
                    marginTop: 8,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: "#FFD700",
                    fontSize: 16,
                    textAlign: "center",
                    marginTop: 4,
                  }}
                >
                  {item.price} 
                </Text>
              </View>
            );
          })}
        </Swiper>
      ) : (
        <Text style={{ textAlign: "center", color: isDarkMode ? "#fff" : "#000" }}>
          {t("NoProductsAvailable")}
        </Text>
      )}
    </View>
  );
}