import { useEffect } from "react";
import { Stack, router, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootLayoutNav() {
    const { user, loading } = useAuth();
    const segments = useSegments();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === 'login';

        if (!user && !inAuthGroup) {
            router.replace('/login');
        } else if (user && inAuthGroup) {
            router.replace('/');
        }
    }, [user, loading, segments]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF8E1' }}>
                <ActivityIndicator size="large" color="#FF6F00" />
            </View>
        );
    }

    return (
        <FavoritesProvider>
            <CartProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </CartProvider>
        </FavoritesProvider>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}