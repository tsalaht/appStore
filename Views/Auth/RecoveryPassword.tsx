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
  Icon,
  useToast,
  Pressable,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Mobile, Eye, EyeSlash } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { setPassHome } from "../../store/PassHomeSlice";

export default function RecoveryPassword() {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const toast = useToast();
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const isArabic = i18n.language === "ar";

  const login = async () => {

    if (!password.trim()) {
      showToast(t("password_required"), "red.500");
      return;
    }
    showToast(t("registration_successful"), "#FFD700");
    navigation.navigate("Login")
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
      {t('recovery_password')}
        </Text>
      </Stack>

      <VStack space="14px" flex={1} mt="50px" mb={10}>
        {/* Password Input */}
        <Text textAlign={isArabic ? "right" : "left"} color={textColor}>
{t('new_password')}
        </Text>
        <Box
          flexDirection={isArabic ? "row-reverse" : "row"}
          alignItems="center"
          px={4}
          borderWidth={1}
          borderColor={inputBorderColor}
          rounded="8px"
        >
          <Input
            placeholder={t("password_placeholder")}
            textAlign={isArabic ? "right" : "left"}
            flex={1}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            variant="unstyled"
            _focus={{ backgroundColor: "transparent", borderColor: "transparent" }}
            bg="transparent"
            borderWidth={0}
            color={textColor}
          />
          <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              as={isPasswordVisible ? <EyeSlash /> : <Eye />}
              color="#FFD700"
              size="26"
            />
          </Pressable>
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
{t('back_to_login')}
        </Text>
      </Button>
    </VStack>
  );
}
