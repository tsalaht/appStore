import { View, Text, VStack, HStack, ScrollView, Pressable } from "native-base";
import React, { useEffect, useState } from "react";
import styles from "../Styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { useTranslation } from "react-i18next";
import { fetchCategories } from "../../store/categories/categoriesSlice";
import { ArrowLeft, ArrowDown2, ArrowUp2 } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";

const PageTwo = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const categories = useSelector((state: RootState) => state.categories.items);
  const loading = useSelector((state: RootState) => state.categories.loading);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(fetchCategories())
      .unwrap()
      .then((data) => console.log("Fetched categories:", data))
      .catch((error) => console.log("Error fetching categories:", error));
  }, [dispatch]);

  // Toggle function to expand/collapse categories with children
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId], 
    }));
  };

  return (
    <ScrollView
      style={[
        styles.mainContainer,
        isDarkMode ? styles.darkBckground : styles.lightBckground,
      ]}
    >
      <VStack space={4} py={8}>

        {/* Static Categories */}
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

        {/* Loading State */}
        {loading && <Text textAlign="center">Loading categories...</Text>}

        {/* API Categories */}
        {!loading &&
          categories.length > 0 &&
          categories.map((category) => (
            <View key={category.id}>
              <Pressable onPress={() => category.children?.length && toggleCategory(category.id)}>
                <HStack
                  w={"full"}
                  px={4}
                  py={2}
                  rounded={4}
                  bgColor={"#F9D77E"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <ArrowLeft size="24" color="#000" variant="Bold" />
                  <Text fontWeight={"bold"} fontSize={16}>{category.name}</Text>

                  {/* Show dropdown icon only if category has children */}
                  {category.children?.length > 0 && (
                    expandedCategories[category.id] ? (
                      <ArrowUp2 size="24" color="#000" />
                    ) : (
                      <ArrowDown2 size="24" color="#000" />
                    )
                  )}
                </HStack>
              </Pressable>

              {/* Render child categories if expanded */}
              {expandedCategories[category.id] && category.children?.map((child:any) => (
                <HStack
                  key={child.id}
                  w={"full"}
                  px={8} // Indent child category
                  py={2}
                  rounded={4}
                  bgColor={"#FDEECF"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <ArrowLeft size="20" color="#000" variant="Bold" />
                  <Text fontWeight={"bold"} fontSize={14}>{child.name}</Text>
                </HStack>
              ))}
            </View>
          ))}
      </VStack>
    </ScrollView>
  );
};

export default PageTwo;
