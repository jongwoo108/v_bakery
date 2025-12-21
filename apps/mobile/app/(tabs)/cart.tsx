import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
    const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

    if (items.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>🛒 장바구니</Text>
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>장바구니가 비어있어요</Text>
                    <Text style={styles.emptySubtext}>맛있는 빵을 담아보세요!</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>🛒 장바구니 ({getTotalItems()})</Text>

            <ScrollView style={styles.list}>
                {items.map(item => (
                    <View key={item.id} style={styles.cartItem}>
                        <Text style={styles.emoji}>{item.emoji}</Text>
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>₩{item.price.toLocaleString()}</Text>
                        </View>
                        <View style={styles.quantityControls}>
                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <Text style={styles.quantityButtonText}>-</Text>
                            </Pressable>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                            <Pressable
                                style={styles.quantityButton}
                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <Text style={styles.quantityButtonText}>+</Text>
                            </Pressable>
                        </View>
                        <Pressable onPress={() => removeFromCart(item.id)}>
                            <Text style={styles.removeButton}>✕</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>총 금액</Text>
                    <Text style={styles.totalPrice}>₩{getTotalPrice().toLocaleString()}</Text>
                </View>
                <Pressable style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>주문하기</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    title: { fontSize: 24, fontWeight: 'bold', padding: 20, color: '#212121' },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { fontSize: 18, color: '#757575' },
    emptySubtext: { fontSize: 14, color: '#9E9E9E', marginTop: 8 },
    list: { flex: 1, paddingHorizontal: 16 },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    emoji: { fontSize: 32, marginRight: 12 },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 16, fontWeight: '600', color: '#212121' },
    itemPrice: { fontSize: 14, color: '#43A047', marginTop: 4 },
    quantityControls: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: { fontSize: 18, color: '#212121' },
    quantity: { fontSize: 16, fontWeight: '600', marginHorizontal: 12 },
    removeButton: { fontSize: 18, color: '#9E9E9E', padding: 8 },
    footer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: { fontSize: 16, color: '#757575' },
    totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#212121' },
    orderButton: {
        backgroundColor: '#43A047',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    orderButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});