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

    const updateStock = async (id: number, newStock: number) => {
        const stock = Math.max(0, newStock);

        // Supabase에 저장
        await supabase
            .from('breads')
            .update({ stock })
            .eq('id', id);

        // 로컬 상태 업데이트   
        setBreads(current =>
            current.map(bread =>
                bread.id === id ? { ...bread, stock } : bread
            )
        );
    };

    const handleStockChange = (id: number, value: string) => {
        const num = parseInt(value) || 0;
        updateStock(id, num);
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
                            <View style={styles.stockControl}>
                                <Pressable
                                    style={styles.stockButton}
                                    onPress={() => updateStock(bread.id, bread.stock - 1)}
                                >
                                    <Text style={styles.buttonText}>-</Text>
                                </Pressable>
                                <TextInput
                                    style={styles.stockInput}
                                    value={String(bread.stock)}
                                    onChangeText={(value) => handleStockChange(bread.id, value)}
                                    keyboardType="number-pad"
                                    selectTextOnFocus
                                />
                                <Pressable
                                    style={styles.stockButton}
                                    onPress={() => updateStock(bread.id, bread.stock + 1)}
                                >
                                    <Text style={styles.buttonText}>+</Text>
                                </Pressable>
                            </View>
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
                                    <Pressable
                                        style={[styles.actionButton, styles.addButton]}
                                        onPress={() => sendNotification(bread)}
                                    >
                                        <Text style={styles.actionButtonText}>➕ 추가입고</Text>
                                    </Pressable>
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
    stockControl: { flexDirection: 'row', alignItems: 'center' },
    stockButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#43A047', alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    stockInput: { width: 60, height: 40, backgroundColor: '#F5F5F5', borderRadius: 8, textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginHorizontal: 8 },
    actionBar: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0', gap: 8 },
    timeLabel: { fontSize: 16 },
    timeInput: { width: 70, height: 40, backgroundColor: '#FFF8E1', borderRadius: 8, textAlign: 'center', fontSize: 16, fontWeight: 'bold', borderWidth: 1, borderColor: '#FFA726' },
    actionButton: { paddingHorizontal: 16, height: 40, backgroundColor: '#43A047', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    addButton: { backgroundColor: '#FFA726' },
    actionButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
});