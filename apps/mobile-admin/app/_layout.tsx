import { useEffect } from "react";
import { Stack, router, useSegments } from "expo-router";
import { AuthProvider, useAuth } from '../context/AuthContext';
import { View, ActivityIndicator } from "react-native";

function RootLayoutNav() {
    const { user, loading } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === 'login';

        if (!user && !inAuthGroup) {
            //로그인 안됨 →  로그인 페이지로
            router.replace('/login');
        } else if (user && inAuthGroup) {
            //로그임 됨 → 메인으로
            router.replace('/');
        }
    }, [user, loading, segments]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#43A047" />
            </View>
        );
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}