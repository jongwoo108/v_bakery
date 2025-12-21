import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function RootLayout() {
    return (
        <FavoritesProvider>
            <CartProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </CartProvider>
        </FavoritesProvider>
    );
}