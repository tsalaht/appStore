import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../Styles";
import { useTranslation } from "react-i18next";
import {
  Pressable,
  ScrollView,
  Stack,
  Text,
  Box,
  Image,
  Button,
  VStack,
  HStack,
} from "native-base";
import { ArrowLeft } from "iconsax-react-native";
import all_product from "../data/all_product";
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

const KidsPart = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        name: t(product.nameKey),
        price: product.new_price,
        image: product.image,
        quantity: 1,
      })
    );
  };
  const kidProducts = all_product.filter(
    (product) => product.category === "kid"
  );

  return (
    <Stack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
    >
      <Stack w={"full"} mb={4} position={"fixed"}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft size="32" color="#FFD700" />
        </Pressable>
      </Stack>
      <ScrollView>
        <VStack space={6} padding={4}>
          {kidProducts.map((product) => (
            <Box
              key={product.id}
              bg={isDarkMode ? "gray.900" : "white"}
              shadow={8}
              rounded="2xl"
              p={5}
              borderWidth={1}
              borderColor={isDarkMode ? "gray.700" : "gray.100"}
              overflow="hidden"
              position="relative"
            >
              {/* Gradient Background */}
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg={{
                  linearGradient: {
                    colors: isDarkMode
                      ? ["gray.800", "gray.900"]
                      : ["purple.50", "blue.50"],
                    start: [0, 0],
                    end: [1, 1],
                  },
                }}
                opacity={0.8}
                zIndex={-1}
              />

              <HStack space={4} alignItems="center">
                {/* Product Image */}
                <Box rounded="xl" overflow="hidden" shadow={4}>
                  <Image
                    source={
                      typeof product.image === "string"
                        ? { uri: product.image }
                        : product.image
                    }
                    alt={product.name}
                    size="xl"
                    resizeMode="cover"
                    style={{
                      width: 120,
                      height: 200,
                    }}
                  />
                </Box>

                {/* Product Details */}
                <VStack flex={1} space={2}>
                  <Text
                    bold
                    fontSize={16}
                    color={isDarkMode ? "white" : "gray.900"}
                    fontFamily="body"
                  >
                    {t(product.nameKey)}
                  </Text>

                  {/* Price Section */}
                  <HStack alignItems="center" space={2}>
                    <Text
                      color={isDarkMode ? "#CFB53B" : "#468500"}
                      bold
                      fontSize="2xl"
                    >
                      ${product.new_price}
                    </Text>
                    {product.old_price && (
                      <Text color="gray.500" strikeThrough fontSize="lg">
                        ${product.old_price}
                      </Text>
                    )}
                  </HStack>

                  <Button
                    onPress={() => handleAddToCart(product)}
                    variant="solid"
                    bgColor="#FFD700"
                    mt={2}
                    _hover={{
                      bg: "#F9D77E",
                      shadow: 6,
                    }}
                    _pressed={{
                      bg: "#F9D77E",
                    }}
                    rounded="full"
                    shadow={3}
                  >
                    <Text bold fontSize="md" color="white">
                      {t("Add_to_cart")}
                    </Text>
                  </Button>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Stack>
  );
};

export default KidsPart;
