import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    title: { fontSize: 24, fontWeight: 'bold', padding: 20, color: '#212121' },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    emptyText: { fontSize: 18, color: '#757575' },
    emptySubtext: { fontSize: 14, color: '#9E9E9E', marginTop: 8 },
});