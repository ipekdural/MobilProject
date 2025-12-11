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
            tabBarInactiveTintColor: '#a29bfe',
            tabBarStyle: {
              position: 'absolute',
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 5,
              backgroundColor: '#ffffff',
              borderRadius: 20,
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
              borderTopWidth: 0,
              shadowColor: '#6c5ce7',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.15,
              shadowRadius: 10,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
              paddingBottom: 5
            },
            tabBarIcon: ({ color, size, focused }) => {
              const iconSize = focused ? 28 : 24;
              // Using BarChart3 because Lucide often versions icons
              if (route.name === 'Zamanlayıcı') {
                return <Timer color={color} size={iconSize} strokeWidth={focused ? 2.5 : 2} />;
              } else if (route.name === 'Raporlar') {
                return <BarChart3 color={color} size={iconSize} strokeWidth={focused ? 2.5 : 2} />;
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
