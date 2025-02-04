import { View,Text, VStack, HStack, ScrollView, Pressable } from "native-base";
import React from "react";
import styles from "../Styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "iconsax-react-native";

const PageTwo = () => {
  const { t } = useTranslation(); 
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const navigation = useNavigation<any>();
  return (
   
      <ScrollView
        style={[
          styles.mainContainer,
          isDarkMode ? styles.darkBckground : styles.lightBckground,
        ]}
      >
      <VStack space={4}>


 <Pressable onPress={() => navigation.navigate("men")}>
 <HStack w={'full'} px={4} py={2} rounded={4} bgColor={'#F9D77E'} alignItems={'center'} justifyContent={'space-between'}>
 <ArrowLeft size="24" color="#000"  variant="Bold"/>
 <Text fontWeight={'bold'} fontSize={16}>
  Men
 </Text>
 </HStack>
 </Pressable>
 <Pressable onPress={() => navigation.navigate("women")}>
 <HStack w={'full'} px={4} py={2} rounded={4} bgColor={'#F9D77E'} alignItems={'center'} justifyContent={'space-between'}>
 <ArrowLeft size="24" color="#000"  variant="Bold"/>
 <Text fontWeight={'bold'} fontSize={16}>
  Women
 </Text>
 </HStack>
 </Pressable>
 <Pressable onPress={() => navigation.navigate("kid")}>
 <HStack w={'full'} px={4} py={2} rounded={4} bgColor={'#F9D77E'} alignItems={'center'} justifyContent={'space-between'}>
 <ArrowLeft size="24" color="#000"  variant="Bold"/>
 <Text fontWeight={'bold'} fontSize={16}>
 Kids
 </Text>
 </HStack>
 </Pressable>
 
      </VStack>

      </ScrollView>
  
  );
};

export default PageTwo;
