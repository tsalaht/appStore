import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { incrementQuantity, decrementQuantity, clearCart, removeFromCart, sendOrder } from '../../store/cartSlice';
import { Box, Text, Button, VStack, HStack, ScrollView, Icon, Pressable, Image, Checkbox } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from '../Styles';
import { useNavigation } from '@react-navigation/native';

const PageThree = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigation: any = useNavigation();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const toggleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const selectAllItems = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  return (
    <VStack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
      flex={1}
    >
      <ScrollView flex={1}>
        {cartItems.length === 0 ? (
          <Box flex={1} justifyContent="center" alignItems="center">
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
          </Box>
        ) : (
          <>
            <Button
              variant="subtle"
              onPress={selectAllItems}
              leftIcon={<Icon as={MaterialIcons} name={selectedItems.length === cartItems.length ? "check-box" : "check-box-outline-blank"} size="sm" />}
            >
              {selectedItems.length === cartItems.length ? t("deselect_all") : t("select_all")}
            </Button>
            {cartItems.map(item => (
              <Pressable key={item.id} onPress={() => toggleItemSelection(item.id)}>
                <Box
                  bg={isDarkMode ? 'gray.800' : 'white'}
                  shadow={4}
                  rounded="xl"
                  margin={4}
                  padding={4}
                  borderWidth={1}
                  borderColor={isDarkMode ? 'gray.700' : 'gray.200'}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <Checkbox
                      value={selectedItems.includes(item.id)}
                      onChange={() => toggleItemSelection(item.id)}
                      accessibilityLabel="Select item"
                    />
                    <VStack justifyContent="space-between" alignItems="center" space={4} flex={1}>
                      <Image
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        alt={t("product_image")}
                        width={200}
                        height={200}
                        borderRadius={8}
                      />

                      <VStack flex={1} space={2} alignItems={isArabic ? "flex-end" : "flex-start"}>
                        <Text bold fontSize={16} color={isDarkMode ? 'white' : 'gray.900'}>
                          {item.name}
                        </Text>
                        <Text color={isDarkMode ? 'gray.400' : 'gray.600'}>
                          {t("price_each", { price: item.price.toFixed(2) })}
                        </Text>

                        <HStack alignItems="center" space={2} flexDirection={isArabic ? 'row-reverse' : 'row'}>
                          <Text bold>{t("color")}:</Text>
                          {item.color ? (
                            <Box
                              width={5}
                              height={5}
                              borderRadius={10}
                              bgColor={item.color}
                              borderWidth={1}
                              borderColor={isDarkMode ? 'white' : 'gray.900'}
                            />
                          ) : (
                            <Text color={isDarkMode ? 'gray.400' : 'gray.600'}>{t("N/A")}</Text>
                          )}
                        </HStack>

                        {item.size && (
                          <Text>
                            <Text bold>{t("size")}:</Text> {item.size}
                          </Text>
                        )}
                      </VStack>

                      <VStack alignItems="center" space={2}>
                        <HStack alignItems="center" space={2} flexDirection={isArabic ? 'row-reverse' : 'row'}>
                          <Button
                            variant="outline"
                            size="sm"
                            onPress={() => dispatch(decrementQuantity({ id: item.id, size: item.size, color: item.color }))}
                            borderRadius="full"
                            width={8}
                            height={8}
                            padding={0}
                          >
                            <Icon as={MaterialIcons} name="remove" size="sm" color={isDarkMode ? 'white' : 'gray.900'} />
                          </Button>

                          <Box
                            bg={isDarkMode ? 'gray.700' : 'gray.100'}
                            borderRadius="md"
                            paddingX={3}
                            paddingY={1}
                          >
                            <Text bold fontSize="md" color={isDarkMode ? 'white' : 'gray.900'}>
                              {item.quantity}
                            </Text>
                          </Box>

                          <Button
                            variant="outline"
                            size="sm"
                            onPress={() => dispatch(incrementQuantity({ id: item.id, size: item.size, color: item.color }))}
                            borderRadius="full"
                            width={8}
                            height={8}
                            padding={0}
                          >
                            <Icon as={MaterialIcons} name="add" size="sm" color={isDarkMode ? 'white' : 'gray.900'} />
                          </Button>
                        </HStack>

                        <Button
                          variant="subtle"
                          bgColor="#F9D77E"
                          onPress={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                          leftIcon={<Icon as={MaterialIcons} name="delete" size="sm" />}
                        >
                          {t("remove")}
                        </Button>
                      </VStack>
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </>
        )}
      </ScrollView>

      {/* Sticky Footer */}
      {cartItems.length > 0 && (
        <Box
          bg={isDarkMode ? 'gray.900' : 'white'}
          shadow={6}
          padding={4}
          borderTopWidth={1}
          borderTopColor={isDarkMode ? 'gray.700' : 'gray.200'}
        >
          <HStack justifyContent="space-between" alignItems="center" flexDirection={isArabic ? 'row-reverse' : 'row'}>
            <Text bold fontSize="xl" color={isDarkMode ? 'white' : 'gray.900'}>
              {t("total")}
            </Text>
            <Text bold fontSize="xl" color="#468500">
              ${totalAmount.toFixed(2)}
            </Text>
          </HStack>

          <HStack space={4} marginTop={4}>
            <Button
              variant="solid"
              bg="#FFD700"
              onPress={() => dispatch(clearCart())}
              leftIcon={<Icon as={MaterialIcons} name="delete-sweep" size="sm" color="white" />}
              flex={1}
            >
              <Text color="white" bold>
                {t("clear_cart")}
              </Text>
            </Button>

            <Button
              variant="solid"
              bg="#F9D77E"
              onPress={() => {
                console.log("Sending selected orders...");
                dispatch(sendOrder({ itemIds: selectedItems }));
              }}
              leftIcon={<Icon as={MaterialIcons} name="local-shipping" size="sm" color="#468500" />}
              flex={1}
              isDisabled={selectedItems.length === 0}
            >
              <Text color="#468500" bold>
                {t("send_order")}
              </Text>
            </Button>
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

export default PageThree;