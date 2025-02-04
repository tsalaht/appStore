import React, { useEffect, useRef } from "react";
import { Animated, FlatList, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import all_product from "../data/all_product";
import styles from "../Styles";
import { HStack, VStack, Text, Image, Stack } from "native-base";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_SPACING = 12;
const AUTO_SCROLL_INTERVAL = 3000;

export default function NewProducts() {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const getProductsByCategory = (category: string) => {
    return all_product
      .filter((product) => product.category === category)
      .slice(0, 3);
  };

  const displayedProducts = [
    ...getProductsByCategory("women"),
    ...getProductsByCategory("men"),
    ...getProductsByCategory("kid"),
  ];

  useEffect(() => {
    let scrollPosition = 0;
    const totalWidth = (CARD_WIDTH + CARD_SPACING) * displayedProducts.length;
  
    const autoScroll = setInterval(() => {
      scrollPosition += (CARD_WIDTH + CARD_SPACING) ; // Faster increment
  
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }
  
      flatListRef.current?.scrollToOffset({
        offset: scrollPosition,
        animated: true,
      });
    }, 1500); // Faster scrolling interval of 1.5 seconds
  
    return () => clearInterval(autoScroll);
  }, [displayedProducts]);
  

  return (
    <View
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
    >
      <VStack w={"full"} alignItems={"center"} justifyContent={"center"} mb={12}>
        <Text
          style={[
            isDarkMode ? styles.darkText : styles.lightText,
            { fontSize: 20, marginBottom: 16 },
          ]}
        >
          <Text style={{ color: "#FFD700" }}>New</Text> Products
        </Text>
        <Stack width={"20%"} h={1.5} bg={"#FFD700"} rounded={4}></Stack>
      </VStack>

      <FlatList
        ref={flatListRef}
        data={displayedProducts}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: CARD_SPACING / 2 }}
        renderItem={({ item }) => (
          <View
            style={{
              width: CARD_WIDTH,
              marginRight: CARD_SPACING,
              alignItems: "center",
            }}
          >
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              alt={`${t(item.nameKey)}`}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <HStack
              w={"90%"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mt={5}
            >
              <Text
                style={isDarkMode ? styles.darkText : styles.lightText}
                w={"70%"}
              >
                {t(item.nameKey)}
              </Text>
              <VStack>
                <Text
                  style={{ color: isDarkMode ? "#FFDF00" : "black" }}
                  fontSize={18}
                >
                  ${item.new_price}
                </Text>
                <Text
                  style={{ textDecorationLine: "line-through", color: "red" }}
                >
                  ${item.old_price}
                </Text>
              </VStack>
            </HStack>
          </View>
        )}
      />
    </View>
  );
}
