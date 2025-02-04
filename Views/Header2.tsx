import React, { useState, useEffect } from "react";
import { Stack, Pressable, Text, Center, Switch, Popover, VStack, HStack, Box, Input, Icon } from "native-base";
import { Setting2, Moon, Sun1, SearchNormal1 } from "iconsax-react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { setLanguage } from "../store/languageSlice";
import { RootState } from "../store/store";
import i18n from "../Locale/i18n";
import { setSearchQuery } from "../store/searchSlice";

const Header2 = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showSetting, setShowSetting] = useState<boolean>(false);
 
  const [searchQuery, setLocalSearchQuery] = useState<string>("");
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

  const handleSearchChange = (text: string) => {
    setLocalSearchQuery(text);
    dispatch(setSearchQuery(text));
  };

  const showMessage = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 1000);
  };

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleThemePress = () => {
    dispatch(toggleTheme());
    const themeMessage = isDarkMode ? i18n.t("lightMode") : i18n.t("darkMode");
    showMessage(themeMessage);
  };

  const handleLanguageChange = (lang: string) => {
    dispatch(setLanguage(lang));
    setShowDropdown(false);
    showMessage(i18n.t("language") + `: ${lang}`);
  };

  return (
    <Stack width="100%" paddingX={8} paddingY={8} backgroundColor={isDarkMode ? "black" : "#FFF6DF"} position="relative" > 
    <VStack position={'absolute'} overflow={'hidden'} h={100} bottom={0} right={-20} width={'full'}>
    <Stack position={'absolute'} height={250} width={250} borderColor={'#FFF0C9'} bgColor={'transparent'} borderWidth={8} right={-100} top={-100} rounded={'full'}></Stack>
<Stack position={'absolute'} height={200} width={200} borderColor={'#FFF0C9'} bgColor={'transparent'} borderWidth={8} right={-80} top={-80} rounded={'full'}></Stack>
<Stack position={'absolute'} height={150} width={150} borderColor={'#FFF0C9'} bgColor={'transparent'} borderWidth={8} right={-60} top={-50} rounded={'full'}></Stack>
    </VStack>

      <HStack w={'full'} alignItems={'center'} justifyContent={'space-between'}>
        {/* Settings Icon */}
        <Pressable onPress={() => setShowSetting(!showSetting)}>
          <Setting2 size="26" color="#FFD700" />
        </Pressable>

        {/* Search Box */}
        <Box width="70%" variant="filled"   bgColor={isDarkMode ? "#333333" : "#F5F5F5"}  borderRadius="8"    borderWidth={1} borderColor={'#FFD700'}>
        <Input
          
          variant="unstyled"
          _focus={{ backgroundColor: "transparent", borderColor: "transparent" }}
          bg="transparent"
          borderWidth={0}
          placeholder={i18n.t("searchPlaceholder") || "Search..."}
          value={searchQuery}
          onChangeText={handleSearchChange}
          InputLeftElement={<Icon as={<SearchNormal1 />} size={5} ml={2} color={isDarkMode ? "#FFD700" : "gray.500"} />}
          color={isDarkMode ? "white" : "black"}
    
        />
        </Box>
      

        {/* Theme Toggle Icon */}
        <Pressable onPress={handleThemePress}>
          {isDarkMode ? <Sun1 size="26" color="#FFD700" /> : <Moon size="26" color="#FFD700" />}
        </Pressable>
      </HStack>

      {showSetting && (
        <Box 
          position="absolute" 
          top={20}
          left={5}
          zIndex={10}
          width="100%"
        >
          <VStack
            space={4}
            backgroundColor="#F9D77E"
            p={5}
            rounded="8px"
            width="60%"
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text color={isDarkMode ? "white" : "black"}>{i18n.t("language")}</Text>
              <Popover
                isOpen={showDropdown}
                onClose={() => setShowDropdown(false)}
                trigger={(triggerProps) => (
                  <Pressable {...triggerProps} onPress={() => setShowDropdown(true)} bg={isDarkMode ? "#D4AF37" : "white"} padding={2} rounded="md">
                    <Text color={isDarkMode ? "white" : "black"}>
                      {currentLanguage === "ar" ? "العربية" : "English"}
                    </Text>
                  </Pressable>
                )}
              >
                <Popover.Content width="150px">
                  <Popover.Body>
                    <Box>
                      <Pressable onPress={() => handleLanguageChange("ar")} mb={4}>
                        <Text>العربية</Text>
                      </Pressable>
                      <Pressable onPress={() => handleLanguageChange("en")}>
                        <Text>English</Text>
                      </Pressable>
                    </Box>
                  </Popover.Body>
                </Popover.Content>
              </Popover>
            </HStack>
          </VStack>
        </Box>
      )}
    </Stack>
  );
};

export default Header2;