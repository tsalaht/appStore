import React from "react";
import { View, FlatList, Dimensions} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import all_product from "../data/all_product";
import styles from "../Styles";
import { ArrowRight2 ,ArrowCircleRight} from "iconsax-react-native";
import { HStack, VStack, Text, Image, Stack, Pressable  } from "native-base";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
const CARD_SPACING = 12;

export default function Kids() {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
 const navigation: any = useNavigation();
  // Fetch only "men" products
  const kidsProducts = all_product.filter((product) => product.category === "kid").slice(0, 3);

  return (
    <View
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
    >
      <HStack w={"full"} alignItems={"center"}  justifyContent={'space-between'} my={4}>
        <Text
          style={[
            isDarkMode ? styles.darkText : styles.lightText,
            { fontSize: 20,},
          ]}
        >
          <Text style={{ color: "#FFD700" }}>K</Text>ids
        </Text>
        <Pressable px={4} py={2}rounded={4} bgColor={'#F9D77E'} onPress={() => navigation.navigate("page two", { screen: "kid" })}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
            <Text fontSize={12}>
         {t('show_all')}
            </Text>
            </HStack>
        </Pressable>
      </HStack>

      {/* Render only men products */}
      <FlatList
        data={kidsProducts}
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
                typeof item.image === "string" ? { uri: item.image } : item.image
              }
              alt={`${t(item.nameKey)}`}
              style={{ width: "100%", borderRadius: 8 }}
            />
            <HStack w={"90%"} alignItems={"center"} justifyContent={"space-between"} mt={5}>
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
                <Text style={{ textDecorationLine: "line-through", color: "red" }}>
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
