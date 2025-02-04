import React, { useState } from "react";
import { StatusBar as RNStatusBar, Platform } from "react-native";
import styles from "../Styles";
import {
  VStack,
  Text,
  Stack,
  Input,
  Box,
  Button,
  useToast,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Mobile } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";

export default function Login() {
  const navigation: any = useNavigation();
  const toast = useToast();
  const { t } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const login = async () => {
    if (!phoneNumber.trim()) {
      showToast(t("phone_required"), "red.500");
      return;
    }
    showToast(t("registration_successful"), "#FFD700");
    navigation.navigate("Confirmation");
  };

  const showToast = (message: string, bgColor: string) => {
    toast.show({
      placement: "top",
      render: () => (
        <Box bg={bgColor} px="2" py="1" rounded="sm" _text={{ color: "light.100" }}>
          {message}
        </Box>
      ),
    });
  };

  const textColor = isDarkMode ? "#FFFFFF" : "#000000";
  const inputBorderColor = isDarkMode ? "#333333" : "#E9E9F1";

  return (
    <VStack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
      flex={1}
    >
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
      <Stack w="full" justifyContent="center" alignItems="center">
        <Text fontWeight={700} fontSize="16px" color={textColor}>
          {t("login")}
        </Text>
      </Stack>

      <VStack space="14px" flex={1} mt="50px" mb={10}>
        <Text color={textColor}>{t("phone_number")}</Text>
        <Box
          flexDirection="row"
          alignItems="center"
          px={4}
          borderWidth={1}
          borderColor={inputBorderColor}
          rounded="8px"
        >
          <Input
            placeholder={t("phone_placeholder")}
            textAlign="right"
            flex={1}
            value={phoneNumber}
            onChangeText={(text) => /^\d*$/.test(text) && setPhoneNumber(text)}
            keyboardType="numeric"
            maxLength={15}
            variant="unstyled"
            _focus={{ backgroundColor: "transparent", borderColor: "transparent" }}
            bg="transparent"
            borderWidth={0}
            color={textColor}
          />
          <Mobile size="26" color="#FFD700" />
        </Box>
      </VStack>

      <Button
        width="full"
        backgroundColor={isPressed ? "#F9D77E" : "#FFD700"}
        rounded="12px"
        mt="84px"
        py="16px"
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={login}
      >
        <Text fontSize="16px" fontFamily="Alexandria_700Bold" color="white">
          {t("login")}
        </Text>
      </Button>
    </VStack>
  );
}
