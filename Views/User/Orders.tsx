import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, markAsRemoved } from "../../store/cartSlice";
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
import { useNavigation } from "@react-navigation/native";
import styles from "../Styles";

const Orders = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigation:any = useNavigation();

  const handleCancelOrder = (id: any, size?: string, color?: string) => {
    dispatch(markAsRemoved({ id, size, color }));
    setTimeout(() => {
      dispatch(removeFromCart({ id, size, color }));
    }, 2000); // Remove from cart after 2 seconds
  };

  return (
    <VStack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      {cartItems.length === 0 ? (
        <VStack space={4} alignItems="center">
          <Text fontSize={18} color={isDarkMode ? "white" : "gray.900"}>
            {t("no_orders")}
          </Text>
          <Button
            colorScheme="blue"
            onPress={() => navigation.navigate("page two")}
          >
            <Text>
              {t("explore_products")}
            </Text>
          </Button>
        </VStack>
      ) : (
        <ScrollView flex={1} width="100%">
          {cartItems.map((item) => {
            let orderStatus = t("in_cart");
            let statusColor = "orange.500";

            if (item.status === "on_the_way") {
              orderStatus = t("on_the_way");
              statusColor = "green.500";
            } else if (item.status === "removed") {
              orderStatus = t("removed");
              statusColor = "red.500";
            }

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

                      {item.size && (
                        <Text>
                          <Text bold>{t("size")}:</Text> {item.size}
                        </Text>
                      )}

                      <Text bold color={statusColor}>
                        {t("status")}: {orderStatus}
                      </Text>

                      {item.status === "on_the_way" && (
                        <Button
                          colorScheme="red"
                          size="sm"
                          onPress={() =>
                            handleCancelOrder(item.id, item.size, item.color)
                          }
                          leftIcon={
                            <Icon
                              as={MaterialIcons}
                              name="cancel"
                              size="sm"
                              color="white"
                            />
                          }
                          mt={2}
                        >
                          {t("cancel_order")}
                        </Button>
                      )}
                    </VStack>
                  </VStack>
                </Box>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </VStack>
  );
};

export default Orders;