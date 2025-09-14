import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../screens/Dashboard/DashboardScreen";
//import DiarioScreen from "../screens/Diario/DiarioScreen";

export type AppStackParamList = {
  Dashboard: undefined;
  Diario: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
//<Stack.Screen name="Dashboard" component={DashboardScreen} />
 //     <Stack.Screen name="Diario" component={DiarioScreen} />