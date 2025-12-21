import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { supabase, Bread } from "../lib/supabase";

type BreadStatus = "active" | "scheduled" | "soldout";

const statusLabels: Record<BreadStatus, string> = {
    active: "🟢 판매중",
    scheduled: "🟡 출고예정",
    soldout: "🔴 품절",
};

const nextStatus: Record<BreadStatus, BreadStatus> = {
    active: "soldout",
    soldout: "scheduled",
    scheduled: "active",
};

export default function AdminDashboard() {
    const [breads, setBreads] = useState<Bread[]>([]);
    const [loading, setLoading] = useState(true);
    const [addStockAmounts, setAddStockAmounts] = useState<Record<number, string>>({});

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

    const toggleStatus = async (id: number) => {
        const bread = breads.find(b => b.id === id);
        if (!bread) return;

        const newStatus = nextStatus[bread.status];

        await supabase
            .from('breads')
            .update({ status: newStatus })
            .eq('id', id);

        setBreads(current =>
            current.map(bread =>
                bread.id === id
                    ? { ...bread, status: nextStatus[bread.status] }
                    : bread
            )
        );
    };

    const updateScheduledTime = async (id: number, time: string) => {
        await supabase
            .from('breads')
            .update({ scheduled_time: time })
            .eq('id', id);

        setBreads(current =>
            current.map(bread =>
                bread.id === id ? { ...bread, scheduled_time: time } : bread
            )
        );
    };

    const sendNotification = async (bread: Bread) => {
        const message = `🔔 ${bread.emoji} ${bread.name} 지금 나왔어요!`;
        if (Platform.OS === 'web') {
            window.alert(message + "\n\n(실제로는 푸시 알림이 발송됩니다)");
        } else {
            Alert.alert("알림 발송", message);
        }

        await supabase
            .from('breads')
            .update({ status: "active" })
            .eq('id', bread.id);

        setBreads(current =>
            current.map(b =>
                b.id === bread.id ? { ...b, status: "active" as BreadStatus } : b
            )
        );
    };

    const handleAddStock = async (bread: Bread) => {
        const amount = parseInt(addStockAmounts[bread.id] || "0");
        if (amount <= 0) {
            if (Platform.OS === 'web') {
                window.alert("추가할 수량을 입력하세요");
            } else {
                Alert.alert("알림", "추가할 수량을 입력하세요");
            }
            return;
        }

        const newStock = bread.stock + amount;

        await supabase
            .from('breads')
            .update({ stock: newStock })
            .eq('id', bread.id);

        setBreads(current =>
            current.map(b =>
                b.id === bread.id ? { ...b, stock: newStock } : b
            )
        );

        // 입력 초기화
        setAddStockAmounts(current => ({ ...current, [bread.id]: "" }));

        // 알림
        const message = `📦 ${bread.name} ${amount}개 추가입고 완료!\n현재 재고: ${newStock}개`;
        if (Platform.OS === 'web') {
            window.alert(message);
        } else {
            Alert.alert("입고 완료", message);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ padding: 20 }}>로딩중...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🍞 V-Bakery 관리</Text>
                <Text style={styles.subtitle}>재고 및 출고 관리</Text>
            </View>

            <ScrollView style={styles.list}>
                {breads.map(bread => (
                    <View key={bread.id} style={styles.item}>
                        <View style={styles.topRow}>
                            <Text style={styles.emoji}>{bread.emoji}</Text>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{bread.name}</Text>
                                <Pressable onPress={() => toggleStatus(bread.id)}>
                                    <Text style={styles.statusBadge}>
                                        {statusLabels[bread.status]}
                                    </Text>
                                </Pressable>
                            </View>
                            <Text style={styles.currentStock}>현재: {bread.stock}개</Text>
                        </View>

                        {bread.status !== "soldout" && (
                            <View style={styles.actionBar}>
                                {bread.status === "scheduled" && (
                                    <>
                                        <Text style={styles.timeLabel}>⏰</Text>
                                        <TextInput
                                            style={styles.timeInput}
                                            value={bread.scheduled_time || ""}
                                            onChangeText={(value) => updateScheduledTime(bread.id, value)}
                                            placeholder="00:00"
                                            maxLength={5}
                                        />
                                        <Pressable
                                            style={styles.actionButton}
                                            onPress={() => sendNotification(bread)}
                                        >
                                            <Text style={styles.actionButtonText}>출고완료</Text>
                                        </Pressable>
                                    </>
                                )}
                                {bread.status === "active" && (
                                    <>
                                        <Text style={styles.addLabel}>추가입고:</Text>
                                        <TextInput
                                            style={styles.addStockInput}
                                            value={addStockAmounts[bread.id] || ""}
                                            onChangeText={(value) =>
                                                setAddStockAmounts(current => ({ ...current, [bread.id]: value }))
                                            }
                                            placeholder="0"
                                            keyboardType="number-pad"
                                        />
                                        <Pressable
                                            style={[styles.actionButton, styles.addButton]}
                                            onPress={() => handleAddStock(bread)}
                                        >
                                            <Text style={styles.actionButtonText}>입고하기</Text>
                                        </Pressable>
                                    </>
                                )}
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    header: { padding: 20, backgroundColor: '#43A047' },
    title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
    subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
    list: { flex: 1, padding: 16 },
    item: { backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 12 },
    topRow: { flexDirection: 'row', alignItems: 'center' },
    emoji: { fontSize: 32, marginRight: 12 },
    itemInfo: { flex: 1 },
    itemName: { fontSize: 16, fontWeight: '600', color: '#212121' },
    statusBadge: { fontSize: 12, color: '#616161', marginTop: 4 },
    currentStock: { fontSize: 14, fontWeight: '600', color: '#43A047' },
    actionBar: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0', gap: 8 },
    timeLabel: { fontSize: 16 },
    addLabel: { fontSize: 14, color: '#616161' },
    timeInput: { width: 70, height: 40, backgroundColor: '#FFF8E1', borderRadius: 8, textAlign: 'center', fontSize: 16, fontWeight: 'bold', borderWidth: 1, borderColor: '#FFA726' },
    addStockInput: { width: 60, height: 40, backgroundColor: '#FFF8E1', borderRadius: 8, textAlign: 'center', fontSize: 16, fontWeight: 'bold', borderWidth: 1, borderColor: '#FFA726' },
    actionButton: { paddingHorizontal: 16, height: 40, backgroundColor: '#43A047', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    addButton: { backgroundColor: '#FFA726' },
    actionButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
});