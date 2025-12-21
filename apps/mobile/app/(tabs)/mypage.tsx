import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>👤 마이페이지</Text>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📋 주문 내역</Text>
                <Text style={styles.placeholder}>아직 주문 내역이 없어요</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>❤️ 찜 목록</Text>
                <Text style={styles.placeholder}>찜한 빵이 없어요</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    title: { fontSize: 24, fontWeight: 'bold', padding: 20, color: '#212121' },
    section: { backgroundColor: '#FFFFFF', margin: 16, padding: 16, borderRadius: 12 },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#212121', marginBottom: 12 },
    placeholder: { fontSize: 14, color: '#9E9E9E' },
});