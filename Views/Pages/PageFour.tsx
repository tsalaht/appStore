import { View, Text, VStack, HStack, Button, Avatar, Switch, Divider } from "native-base";
import React from "react";
import styles from "../Styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { setPassHome } from "../../store/PassHomeSlice";

const PageFour = () => {
  const { t } = useTranslation();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const userProfile = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Define text colors based on dark mode
  const textColor = isDarkMode ? "#E0E0E0" : "#000000"; // Primary text color
  const secondaryTextColor = isDarkMode ? "#9E9E9E" : "#616161"; // Secondary text color

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
          <Avatar size="lg" source={{ uri: userProfile?.avatar }} />
          <VStack>
            <Text style={{ color: textColor, fontSize: 20, fontWeight: "bold" }}>
              {userProfile?.name || t("Guest User")}
            </Text>
            <Text style={{ color: secondaryTextColor }}>
              {userProfile?.email || t("Email not available")}
            </Text>
            <Text style={{ color: textColor }}>050-123-4567</Text>
          </VStack>
        </HStack>
        <Button variant="ghost" onPress={() => console.log("Edit Profile")}>
          <Text style={{ color: textColor }}>{t("Edit")}</Text>
        </Button>
      </HStack>

      <Divider bgColor="#FFD700" />

      {/* Address Management */}
      <VStack space={3}>
        <Text bold fontSize="xl" style={{ color: textColor, marginBottom: 2 }}>
          {t("Saved Addresses")}
        </Text>
        {userProfile?.addresses.length > 0 ? (
          userProfile.addresses.map((address, index) => (
            <Text key={index} style={{ color: textColor }}>
              {address}
            </Text>
          ))
        ) : (
          <Text style={{ color: secondaryTextColor }}>{t("No Addresses Found")}</Text>
        )}
      </VStack>

      {/* Policy Section */}
      <VStack space={3}>
        <Text bold fontSize="xl" style={{ color: textColor }}>
          {t("Policy")}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor }}>{t("Privacy Policy")}</Text>
          <Button variant="ghost" onPress={() => console.log("View Policy")}>
            <Text style={{ color: "#FFD700" }}>{t("View")}</Text>
          </Button>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor }}>{t("Terms and Conditions")}</Text>
          <Button variant="ghost" onPress={() => console.log("View Terms")}>
            <Text style={{ color: "#FFD700" }}>{t("View")}</Text>
          </Button>
        </HStack>
      </VStack>

      {/* Order Tracking Section */}
      <VStack space={3}>
        <Text bold fontSize="xl" style={{ color: textColor }}>
          {t("Order Tracking")}
        </Text>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor }}>{t("Current Orders")}</Text>
          <Button variant="ghost" onPress={() => console.log("Track Current Orders")}>
            <Text style={{ color: "#FFD700" }}>{t("Track")}</Text>
          </Button>
        </HStack>
        <HStack justifyContent="space-between" alignItems="center">
          <Text style={{ color: textColor }}>{t("Past Orders")}</Text>
          <Button variant="ghost" onPress={() => console.log("View Past Orders")}>
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
