import React, { useState } from "react";
import {
  StatusBar as RNStatusBar,
  Platform,
} from "react-native";
import styles from "../Styles";
import {
  VStack,
  Text,
  Stack,
  Input,
  Box,
  HStack,
  Pressable,
  Button,
  useToast,
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { UserSquare, Mobile } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { setPassHome } from "../../store/PassHomeSlice";

export default function Register() {
  const navigation: any = useNavigation();
  const toast = useToast();
  const dispatch= useDispatch()
  const { t,i18n  } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const handleRegister = async () => {
    if (!username.trim()) {
      showToast(t("username_required"), "red.500");
      return;
    }
    if (!phoneNumber.trim()) {
      showToast(t("phone_required"), "red.500");
      return;
    }
    showToast(t("registration_successful"), "#FFD700");
    navigation.navigate("Login");
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
  const hintColor = isDarkMode ? "#FFFFFF" : "#333";
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
          {t("new_registration")}
        </Text>
      </Stack>

      <VStack space="14px" flex={1} mt="50px" mb={10}>
        {/* Username Input */}
        <Text color={textColor} fontFamily="Alexandria_500Medium">
          {t("username")}
        </Text>
        <Box
          flexDirection="row"
          alignItems="center"
          px={4}
          borderWidth={1}
          borderColor={inputBorderColor}
          rounded="8px"
        >
          <Input
            placeholder={t("username_placeholder")}
            flex={1}
            variant="unstyled"
            value={username}
            onChangeText={setUsername}
            _focus={{ backgroundColor: "transparent", borderColor: "transparent" }}
            bg="transparent"
            borderWidth={0}
            textAlign="right"
            color={textColor}
          />
          <UserSquare size="24" color="#FFD700" />
        </Box>

        {/* Phone Number Input */}
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
        <HStack
      alignItems="center"
      space="2px"
      flexDirection={i18n.language === "en" ? "row-reverse" : "row"}
    >
      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text fontSize="12px" color="#FFD700">
          {t("login")}
        </Text>
      </Pressable>

      <Text ml="1px" fontSize="12px" color={hintColor}>
        {t("have_account")}
      </Text>
    </HStack>
      </VStack>

      {/* Register Button */}
      <VStack>
      <Button
        width="full"
        backgroundColor={isPressed ? "#F9D77E" : "#FFD700"}
        rounded="12px"
        mt="84px"
        py="16px"
       
        onPress={()=>dispatch(setPassHome(true))}
      >
        <Text fontSize="16px" fontFamily="Alexandria_700Bold" color="white">
          {t("visit_as_a_guest")}
        </Text>
      </Button>
      <Button
        width="full"
        backgroundColor={isPressed ? "#F9D77E" : "#FFD700"}
        rounded="12px"
        mt="20px"
        py="16px"
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={handleRegister}
      >
        <Text fontSize="16px" fontFamily="Alexandria_700Bold" color="white">
          {t("register")}
        </Text>
      </Button>
      </VStack>
     
    </VStack>
  );
}
