import React, { useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useTranslation } from "react-i18next";
import { RootState } from "../../store/store";
import {
  VStack,
  Text,
  Image,
  HStack,
  ScrollView,
  Button,
  Stack,
} from "native-base";
import styles from "../Styles";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "iconsax-react-native";
import i18next from "i18next";

const ProductDetails = () => {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const product = route.params?.product;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const isRTL = i18next.language === "ar"; // Check if the current language is Arabic

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      dispatch(
        addToCart({
          id: product.id,
          name: t(product.nameKey),
          price: product.new_price,
          image: product.image,
          quantity: 1,
          size: selectedSize,
          color: selectedColor,
        })
      );
    } else {
      alert(t("Please_select_size_and_color"));
    }
  };

  return (
    <VStack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
    >
      <Stack w={"full"} mb={4} position={"fixed"}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size="32" color={isDarkMode ? "#CFB53B" : "#FFD700"} />
        </Pressable>
      </Stack>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <HStack
          width={"full"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Image
            source={
              typeof product.image === "string"
                ? { uri: product.image }
                : product.image
            }
            width={250}
            height={310}
            rounded={4}
            resizeMode="cover"
            alt={'product'}
          />
          <VStack space={2}>
            {[1, 2, 3].map((_, idx) => (
              <Image
                key={idx}
                source={
                  typeof product.image === "string"
                    ? { uri: product.image }
                    : product.image
                }
                width={100}
                height={100}
                rounded={4}
                resizeMode="cover"
                alt={'product'}
              />
            ))}
          </VStack>
        </HStack>

        <Text
          fontSize={28}
          marginTop={2}
          color={isDarkMode ? "#FFFFFF" : "#000000"}
          textAlign={isRTL ? "right" : "left"}
        >
          {t(product.nameKey)}
        </Text>
        <Text color={isDarkMode ? "#CFB53B" : "#468500"} bold fontSize="2xl" textAlign={isRTL ? "right" : "left"}>
          ${product.new_price}
        </Text>
        {product.old_price && (
          <Text
            style={{
              fontSize: 16,
              textDecorationLine: "line-through",
              color: isDarkMode ? "#DDDDDD" : "#000000",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            ${product.old_price}
          </Text>
        )}

        {/* Size Selection */}
        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            color: isDarkMode ? "#FFFFFF" : "#000000",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("Select_Size")}
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          {["XL", "L", "M", "S"].map((size) => (
            <Pressable
              key={size}
              onPress={() => setSelectedSize(size)}
              style={{
                padding: 10,
                margin: 5,
                borderWidth: 2,
                borderColor:
                  selectedSize === size ? "#468500" : isDarkMode ? "#CFB53B" : "#FFDF00",
                borderRadius: 5,
                backgroundColor: isDarkMode ? "#2A2A2A" : "#F9D77E",
              }}
            >
              <Text color={isDarkMode ? "#FFFFFF" : "#000000"}>{size}</Text>
            </Pressable>
          ))}
        </View>

        {/* Color Selection */}
        <Text
          style={{
            marginTop: 10,
            fontWeight: "bold",
            color: isDarkMode ? "#FFFFFF" : "#000000",
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {t("Select_Color")}
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          {["#FF0000", "#0000FF", "#008000", "#808080"].map((color) => (
            <Pressable
              key={color}
              onPress={() => setSelectedColor(color)}
              style={{
                backgroundColor: color,
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: selectedColor === color ? 4 : 0,
                borderColor: isDarkMode ? "#CFB53B" : "#FFD700",
                margin: 5,
              }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
      <View style={button.fixedButtonContainer}>
        <Button
          onPress={handleAddToCart}
          backgroundColor={isDarkMode ? "#FFDF00" : "#FFDF00"}
          _text={{ color: isDarkMode ? "#000000" : "#FFFFFF" }}
        >
          {t("Add_to_cart")}
        </Button>
      </View>
    </VStack>
  );
};

export default ProductDetails;

const button = StyleSheet.create({
  fixedButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
});
