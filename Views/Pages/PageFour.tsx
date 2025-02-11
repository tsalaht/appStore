import { View, Text, VStack, HStack, Button, Avatar, Switch, Divider } from "native-base";
import React from "react";
import styles from "../Styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { setPassHome } from "../../store/PassHomeSlice";
import { useNavigation } from "@react-navigation/native";

const PageFour = () => {
  const { t, i18n } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const userProfile = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation:any = useNavigation();

  const textColor = isDarkMode ? "#E0E0E0" : "#000000";
  const secondaryTextColor = isDarkMode ? "#9E9E9E" : "#616161";
  const isRTL = i18n.language === "ar";
  const textAlignStyle = isRTL ? "right" : "left";

  return (
    <VStack
      space={5}
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
      paddingX={6}
      paddingY={4}
    >
      {/* Profile Header */}
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space={4} alignItems="center">
          <Avatar size="lg" source={typeof userProfile?.profileImage === "string" ? { uri: userProfile?.profileImage } : userProfile?.profileImage}
           />
          <VStack>
            <Text
              style={{
                color: textColor,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: textAlignStyle,
              }}
            >
              {userProfile?.name || t("Guest User")}
            </Text>
            <Text style={{ color: secondaryTextColor, textAlign: textAlignStyle }}>
              {userProfile?.address || t("Guest@gmail.com")}
            </Text>
            <Text style={{ color: textColor, textAlign: textAlignStyle }}>
              050-123-4567
            </Text>
          </VStack>
        </HStack>
        <Button variant="ghost" onPress={() => navigation.navigate("profil")}>
          <Text style={{ color: textColor }}>{t("Edit")}</Text>
        </Button>
      </HStack>

      <Divider bgColor="#FFD700" />

      {/* Policy Section */}
      <VStack space={3}>
        <Text
          bold
          fontSize="xl"
          style={{ color: textColor, textAlign: textAlignStyle }}
        >
          {t("Policy")}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor, textAlign: textAlignStyle }}>
            {t("Privacy Policy")}
          </Text>
          <Button variant="ghost" onPress={() => navigation.navigate("Policy")}>
            <Text style={{ color: "#FFD700" }}>{t("View")}</Text>
          </Button>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor, textAlign: textAlignStyle }}>
            {t("Terms and Conditions")}
          </Text>
          <Button variant="ghost" onPress={() => navigation.navigate("TermsAndCondition")}>
            <Text style={{ color: "#FFD700" }}>{t("View")}</Text>
          </Button>
        </HStack>
      </VStack>

      {/* Order Tracking Section */}
      <VStack space={3}>
        <Text
          bold
          fontSize="xl"
          style={{ color: textColor, textAlign: textAlignStyle }}
        >
          {t("Order Tracking")}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor, textAlign: textAlignStyle }}>
            {t("Current Orders")}
          </Text>
          <Button variant="ghost" onPress={() => navigation.navigate("Orders")}>
            <Text style={{ color: "#FFD700" }}>{t("Track")}</Text>
          </Button>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor, textAlign: textAlignStyle }}>
            {t("Past Orders")}
          </Text>
          <Button variant="ghost" onPress={() => navigation.navigate("Orders")}>
            <Text style={{ color: "#FFD700" }}>{t("View")}</Text>
          </Button>
        </HStack>
      </VStack>

      {/* Logout Button */}
      <Button
        variant="solid"
        bgColor="#FFD700"
        onPress={() => dispatch(setPassHome(false))}
        _text={{ color: "white", fontWeight: "bold" }}
      >
        {t("Logout")}
      </Button>
    </VStack>
  );
};

export default PageFour;
