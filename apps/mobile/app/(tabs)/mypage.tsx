import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavorites } from "../../context/FavoritesContext";
import { breads } from "../../data/breads";
import { router } from "expo-router";

export default function MyPageScreen() {

    const { favorites, removeFavorite } = useFavorites();
    const favoriteBreads = breads.filter(bread => favorites.includes(bread.id));

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>👤 마이페이지</Text>

            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>❤️ 찜 목록 ({favoriteBreads.length})</Text>
                    {favoriteBreads.length === 0 ? (
                        <Text style={styles.placeholder}>찜한 빵이 없어요</Text>
                    ) : (
                        favoriteBreads.map(bread => (
                            <Pressable
                                key={bread.id}
                                style={styles.favoriteItem}
                                onPress={() => router.push(`/product/${bread.id}`)}
                            >
                                <Text style={styles.emoji}>{bread.emoji}</Text>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{bread.name}</Text>
                                    <Text style={styles.itemPrice}>₩{bread.price.toLocaleString()}</Text>
                                </View>
                                <Pressable onPress={() => removeFavorite(bread.id)}>
                                    <Text style={styles.removeButton}>✕</Text>
                                </Pressable>
                            </Pressable>
                        ))
                    )}
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📋 주문 내역</Text>
                    <Text style={styles.placeholder}>아직 주문 내역이 없어요</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    title: { fontSize: 24, fontWeight: 'bold', padding: 20, color: '#212121' },
    section: { backgroundColor: '#FFFFFF', margin: 16, padding: 16, borderRadius: 12 },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#212121', marginBottom: 12 },
    placeholder: { fontSize: 14, color: '#9E9E9E' },
    favoriteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    emoji: { fontSize: 32, marginRight: 12 },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 15, fontWeight: '500', color: '#212121' },
    itemPrice: { fontSize: 13, color: '#43A047', marginTop: 2 },
    removeButton: { fontSize: 18, color: '#9E9E9E', padding: 8 },
});