import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";

export type AuthStackParamList = {
  //Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
//<Stack.Screen name="Login" component={LoginScreen} />