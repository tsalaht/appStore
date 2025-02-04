import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WomenPart from "./WomenPart";
import KidsPart from "./KidsPart";
import MenParts from "./MenParts";
import PageTwo from "../Pages/PageTwo";
const Stack = createNativeStackNavigator();

const Parts: React.FC<any> = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="parts"
        component={PageTwo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="women"
        component={WomenPart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="kid"
        component={KidsPart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="men"
        component={MenParts}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Parts;
