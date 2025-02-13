import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Stack,
  Text,
  VStack,
  WarningOutlineIcon,
  useToast,
  Pressable
} from "native-base";
import { TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { Formik } from "formik";
import styles from "../Styles";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { setPassHome } from "../../store/PassHomeSlice";
import { RootState } from "../../store/store";
import { Mobile, Eye, EyeSlash,ArrowLeft } from "iconsax-react-native";

const Confirmation = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const toast = useToast();
  const [isPressed, setIsPressed] = useState(false);

  const validationSchema = yup.object().shape({
    otp: yup.string().required(t("otp_required")).min(5, t("otp_invalid")),
  });

  const initialValues = { otp: "" };

  const handleSubmit:any = async (values: any) => {
    await toast.show({
      placement: "top",
      render: () => (
        <Box bg="#FFD700" px="2" py="1" rounded="sm" _text={{ color: "light.100" }}>
          {t("confirmation_success")}
        </Box>
      ),
    });
    navigation.navigate("recoveryPassword")
  };

  const inputRefs = Array(5)
    .fill(null)
    .map(() => React.createRef<TextInput>());

  const handleChange = (value: string, index: number, setFieldValue: any) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setFieldValue("otp", newOtp.join(""));
    if (value && index < 4) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const textColor = isDarkMode ? "#FFFFFF" : "#000000";
  const inputBorderColor = isDarkMode ? "#FFD700" : "#FFD700";

  return (
    <VStack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
      flex={1}
    >
      <StatusBar style="auto" />
      <Stack w={"full"} mb={4} position={"fixed"}>
              <Pressable onPress={() => navigation.goBack()}>
                <ArrowLeft size="32" color="#FFD700" />
              </Pressable>
            </Stack>
      <Stack w="full" justifyContent="center" alignItems="center">
        <Text fontWeight={700} fontSize="16px" color={textColor}>
          {t("confirm_code")}
        </Text>
      </Stack>

      <Stack h="full" w="full">
        <Stack w="full" justifyContent="center" alignItems="center" mt={10}>
          <Text color={textColor}>{t("enter_code", { phone: "98798733" })}</Text>
        </Stack>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ handleSubmit, errors, touched, setFieldValue }) => (
            <>
              <VStack space="16px">
                <FormControl isInvalid={!!(errors.otp && touched.otp)} marginTop="48px">
                  <HStack space="20px" alignItems="center" justifyContent="center">
                    {otp.map((value, index) => (
                      <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        value={value}
                        onChangeText={(text) => handleChange(text, index, setFieldValue)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        style={{
                          borderBottomWidth: 2,
                          borderBottomColor: value ? inputBorderColor : "#CCCCCC",
                          textAlign: "center",
                          fontSize: 24,
                          width: 40,
                          color: inputBorderColor,
                        }}
                        maxLength={1}
                        keyboardType="number-pad"
                      />
                    ))}
                  </HStack>
                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errors.otp}
                  </FormControl.ErrorMessage>
                </FormControl>
              </VStack>

              <HStack paddingTop="24px" w="full" alignItems="center" justifyContent="center">
                <Text color={textColor}>
                  {t("did_not_receive_code")}
                  <Text underline style={{ color: "#FFD700" }}>
                    {" "}{t("resend")}
                  </Text>
                </Text>
              </HStack>

              <VStack my="32px" space="20px" alignItems="center" bottom={20} left={-3} position="absolute" width="full">
                <Button
                  width="full"
                  backgroundColor={isPressed ? "#F9D77E" : "#FFD700"}
                  rounded="12px"
                  mt="20px"
                  py="16px"
                  onPressIn={() => setIsPressed(true)}
                  onPressOut={() => setIsPressed(false)}
                  onPress={() => handleSubmit()}
                >
                  <HStack alignItems="center" justifyContent="space-between" w="full">
                    <Text fontSize="16px" fontFamily="Alexandria_700Bold" color="white">
                      {t("confirm")}
                    </Text>
                  </HStack>
                </Button>
              </VStack>
            </>
          )}
        </Formik>
      </Stack>
    </VStack>
  );
};

export default Confirmation;
