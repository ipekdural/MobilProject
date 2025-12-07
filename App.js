import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import { Timer, BarChart3 } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#6c5ce7',
            tabBarInactiveTintColor: '#b2bec3',
            tabBarStyle: { paddingBottom: 5, paddingTop: 5, height: 60 },
            tabBarLabelStyle: { fontSize: 12, paddingBottom: 5 },
            tabBarIcon: ({ color, size }) => {
              // Using BarChart3 because Lucide often versions icons
              if (route.name === 'Zamanlayıcı') {
                return <Timer color={color} size={size} />;
              } else if (route.name === 'Raporlar') {
                return <BarChart3 color={color} size={size} />;
              }
            },
          })}
        >
          <Tab.Screen name="Zamanlayıcı" component={HomeScreen} />
          <Tab.Screen name="Raporlar" component={ReportsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
