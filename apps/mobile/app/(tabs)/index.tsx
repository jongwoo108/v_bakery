import { View, Text, ScrollView, StyleSheet, Pressable, useWindowDimensions, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFavorites } from "../../context/FavoritesContext";
import { supabase, Bread } from "../../lib/supabase";
import { useState, useEffect } from "react";

function BreadCard({ bread, isFavorite, onToggleFavorite }: {
    bread: Bread;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}) {
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
                <View style={styles.cardHeader}>
                    <Text style={[styles.cardName, bread.status === "soldout" && styles.soldoutText]}>
                        {bread.name}
                    </Text>
                    <Pressable onPress={(e) => { e.stopPropagation(); onToggleFavorite(); }}>
                        <Text style={{ fontSize: 16 }}>{isFavorite ? '❤️' : '🤍'}</Text>
                    </Pressable>
                </View>
                {bread.status === "active" && (
                    <Text style={styles.stockText}>🔥 {bread.stock}개 남음</Text>
                )}
                {bread.status === "scheduled" && (
                    <Text style={styles.scheduledText}>
                        ⏰ {getTimeRemaining(bread.scheduled_time) || bread.scheduled_time}
                    </Text>
                )}
                {bread.status === "soldout" && (
                    <Text style={styles.soldoutBadge}>품절</Text>
                )}
            </View>
        </Pressable>
    );
}

export default function HomeScreen() {
    const [breads, setBreads] = useState<Bread[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const { width } = useWindowDimensions();
    const { isFavorite, toggleFavorite } = useFavorites();

    useEffect(() => {
        fetchBreads();
    }, []);

    const fetchBreads = async () => {
        const { data, error } = await supabase
            .from('breads')
            .select('*')
            .order('id');

        if (data) {
            setBreads(data);
        }
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchBreads();
        setRefreshing(false);
    };

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

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>🌿 안녕, 종우님</Text>
                <Text style={styles.lineup}>📅 12/21~25 이번 주 라인업</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={styles.grid}>
                    {columns.map((column, columnIndex) => (
                        <View key={columnIndex} style={styles.column}>
                            {column.map(bread => (
                                <BreadCard
                                    key={bread.id}
                                    bread={bread}
                                    isFavorite={isFavorite(bread.id)}
                                    onToggleFavorite={() => toggleFavorite(bread.id)}
                                />
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// 남은 시간 계산 함수
const getTimeRemaining = (scheduledTime?: string) => {
    if (!scheduledTime) return null;

    const now = new Date();
    const [hours, minutes] = scheduledTime.split(':').map(Number);
    const scheduled = new Date();
    scheduled.setHours(hours, minutes, 0, 0);

    const diff = scheduled.getTime() - now.getTime();
    if (diff <= 0) return "곧 출고!";

    const minutesLeft = Math.floor(diff / 60000);
    if (minutesLeft < 60) return `${minutesLeft}분 후`;
    const hoursLeft = Math.floor(minutesLeft / 60);
    const mins = minutesLeft % 60;
    return `${hoursLeft}시간 ${mins}분 후`;
};

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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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