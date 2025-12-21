import { View, Text, ScrollView, StyleSheet, Pressable, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { breads, Bread } from "../../data/breads"


function BreadCard({ bread }: { bread: Bread }) {
    const isInactive = bread.status === "scheduled" || bread.status === "soldout";

    return (
        <Pressable
            style={[styles.card, isInactive && styles.cardInactive]}
            onPress={() => router.push(`/product/${bread.id}`)}>
            {bread.isNew && (
                <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>NEW</Text>
                </View>
            )}
            <View style={[styles.cardImage, { height: bread.height }]}>
                <Text style={styles.emoji}>{bread.emoji}</Text>
            </View>
            <View style={styles.cardInfo}>
                <Text style={[styles.cardName, bread.status === "soldout" && styles.soldoutText]}>
                    {bread.name}
                </Text>
                {bread.status === "active" && (
                    <Text style={styles.stockText}>🔥 {bread.stock}개 남음</Text>
                )}
                {bread.status === "scheduled" && (
                    <Text style={styles.scheduledText}>⏰ {bread.time} 출고</Text>
                )}
                {bread.status === "soldout" && (
                    <Text style={styles.soldoutBadge}>품절</Text>
                )}
            </View>
        </Pressable>
    );
}

export default function HomeScreen() {
    const { width } = useWindowDimensions();

    // 화면 너비에 따라 열 개수 결정
    const getColumnCount = () => {
        if (width >= 1200) return 6;  // 초대형 화면
        if (width >= 900) return 4;   // 데스크톱
        if (width >= 600) return 3;   // 태블릿
        return 2;                      // 모바일
    };

    const columnCount = getColumnCount();

    // 열별로 데이터 분배
    const columns: Bread[][] = Array.from({ length: columnCount }, () => []);
    breads.forEach((bread, index) => {
        columns[index % columnCount].push(bread);
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>🌿 안녕, 종우님</Text>
                <Text style={styles.lineup}>📅 12/21~25 이번 주 라인업</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.grid}>
                    {columns.map((column, columnIndex) => (
                        <View key={columnIndex} style={styles.column}>
                            {column.map(bread => (
                                <BreadCard key={bread.id} bread={bread} />
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 16,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212121',
    },
    lineup: {
        fontSize: 14,
        color: '#757575',
        marginTop: 4,
    },
    grid: {
        flexDirection: 'row',
        paddingHorizontal: 12,
    },
    column: {
        flex: 1,
        paddingHorizontal: 4,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    cardInactive: {
        opacity: 0.5,
    },
    cardImage: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 48,
    },
    cardInfo: {
        padding: 12,
    },
    cardName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#212121',
    },
    soldoutText: {
        textDecorationLine: 'line-through',
        color: '#9E9E9E',
    },
    stockText: {
        fontSize: 12,
        color: '#FF7043',
        marginTop: 4,
    },
    scheduledText: {
        fontSize: 12,
        color: '#FFA726',
        marginTop: 4,
    },
    soldoutBadge: {
        fontSize: 12,
        color: '#9E9E9E',
        marginTop: 4,
    },
    newBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        zIndex: 1,
    },
    newBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});