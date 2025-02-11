import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  incrementQuantity,
  decrementQuantity,
  clearCart,
  removeFromCart,
} from "../../store/cartSlice";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  ScrollView,
  Icon,
  Pressable,
  Image,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import styles from "../Styles";

const Orders = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <VStack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
      flex={1}
    >
      <ScrollView flex={1}>
        {cartItems.map((item) => {
          console.log("Color for product:", item.color);
          return (
            <Pressable key={item.id} onPress={() => {}}>
              <Box
                bg={isDarkMode ? "gray.800" : "white"}
                shadow={4}
                rounded="xl"
                margin={4}
                padding={4}
                borderWidth={1}
                borderColor={isDarkMode ? "gray.700" : "gray.200"}
              >
                <VStack
                  justifyContent="space-between"
                  alignItems="center"
                  space={4}
                >
                  {/* Product Image */}
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                    }
                    alt={t("product_image")}
                    width={200}
                    height={200}
                    borderRadius={8}
                  />

                  <VStack
                    flex={1}
                    space={2}
                    alignItems={isArabic ? "flex-end" : "flex-start"}
                  >
                    {/* Product Name */}
                    <Text
                      bold
                      fontSize={16}
                      color={isDarkMode ? "white" : "gray.900"}
                    >
                      {item.name}
                    </Text>
                    <Text color={isDarkMode ? "gray.400" : "gray.600"}>
                      {t("price_each", { price: item.price.toFixed(2) })}
                    </Text>

                    {/* Display Selected Color */}
                    <HStack
                      alignItems="center"
                      space={2}
                      flexDirection={isArabic ? "row-reverse" : "row"}
                    >
                      <Text bold>{t("color")}:</Text>
                      {item.color ? (
                        <Box
                          width={5}
                          height={5}
                          borderRadius={10}
                          bgColor={`${item.color}`}
                          borderWidth={1}
                          borderColor={isDarkMode ? "white" : "gray.900"}
                        />
                      ) : (
                        <Text color={isDarkMode ? "gray.400" : "gray.600"}>
                          {t("N/A")}
                        </Text>
                      )}
                    </HStack>

                    {/* Display Selected Size */}
                    {item.size && (
                      <Text>
                        <Text bold>{t("size")}:</Text> {item.size}
                      </Text>
                    )}
                  </VStack>
                </VStack>
              </Box>
            </Pressable>
          );
        })}
      </ScrollView>
    </VStack>
  );
};

export default Orders;
