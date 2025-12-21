import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E0E0E0',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#43A047',
                tabBarInactiveTintColor: '#9E9E9E',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '홈',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: '장바구니',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🛒</Text>,
                }}
            />
            <Tabs.Screen
                name="mypage"
                options={{
                    title: 'MY',
                    tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>👤</Text>,
                }}
            />
        </Tabs>
    );
}