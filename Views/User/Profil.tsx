import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../Styles";
import { useTranslation } from "react-i18next";
import { updateProfile } from "../../store/userSlice";
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
  Input,
  Divider,
} from "native-base";
import { ArrowLeft } from "iconsax-react-native";
import * as ImagePicker from "expo-image-picker";
import i18next from "i18next";

const Profil = () => {
  const isRTL = i18next.language === "ar";
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const [name, setName] = useState("John Doe");
  const [address, setAddress] = useState("123 Main St, City");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Handle image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  const saveChanges = () => {
    dispatch(updateProfile({ name, address, profileImage }));
    alert(t('save_changes'));
  };

  return (
    <Stack
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
      paddingX={4}
      paddingY={6}
    >
      {/* Page Header */}
      <HStack
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        flexDirection={isRTL ? "row-reverse" : "row"}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft
            size={24}
            color={isDarkMode ? "#FFD700" : "#F9D77E"}
            style={{ transform: isRTL ? [{ rotateY: "180deg" }] : undefined }}
          />
        </Pressable>
        <Text
          bold
          fontSize="xl"
          color={isDarkMode ? "#FFD700" : "#F9D77E"}
          textAlign={isRTL ? "right" : "left"}
        >
          {t("edit_profile")}
        </Text>
        <Box w={6} />
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Image Section */}
        <VStack alignItems="center" space={4} mb={6}>
          <Pressable onPress={pickImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                alt="Profile Image"
                size={24}
                borderRadius={12}
              />
            ) : (
              <Box
                size={24}
                bgColor={isDarkMode ? "#333" : "#DDD"}
                borderRadius={12}
                alignItems="center"
                justifyContent="center"
              >
                <Text color={isDarkMode ? "#FFD700" : "#F9D77E"}>
                  {t("change_image")}
                </Text>
              </Box>
            )}
          </Pressable>
        </VStack>

        {/* Name Input Section */}
        <VStack space={3} mb={4}>
          <Text
            color={isDarkMode ? "#E0E0E0" : "#000"}
            bold
            textAlign={isRTL ? "right" : "left"}
          >
            {t("name")}
          </Text>
          <Input
            variant="filled"
            bgColor={isDarkMode ? "#333" : "#F5F5F5"}
            color={isDarkMode ? "#FFD700" : "#000"}
            value={name}
            onChangeText={setName}
            placeholder={t("edit_name")}
            textAlign={isRTL ? "right" : "left"}
            _focus={{ borderColor: "#FFD700" }}
          />
        </VStack>

        {/* Address Input Section */}
        <VStack space={3} mb={4}>
          <Text
            color={isDarkMode ? "#E0E0E0" : "#000"}
            bold
            textAlign={isRTL ? "right" : "left"}
          >
            {t("address")}
          </Text>
          <Input
            variant="filled"
            bgColor={isDarkMode ? "#333" : "#F5F5F5"}
            color={isDarkMode ? "#FFD700" : "#000"}
            value={address}
            onChangeText={setAddress}
            placeholder={t("Enter your address")}
            textAlign={isRTL ? "right" : "left"}
            _focus={{ borderColor: "#FFD700" }}
          />
        </VStack>

        <Divider bgColor="#FFD700" />

        {/* Save Button */}
        <Button
          mt={6}
          bgColor="#FFD700"
          onPress={saveChanges}
          _text={{ color: "white", fontWeight: "bold" }}
        >
          {t("save_changes")}
        </Button>
      </ScrollView>
    </Stack>
  );
};

export default Profil;
