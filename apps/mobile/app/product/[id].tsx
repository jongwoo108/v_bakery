import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useCart } from "../../context/CartContext";
// 임시 데이터 (나중에 API로 대체)
const breadData: Record<string, any> = {
    "1": { name: "기본소금빵", emoji: "🥐", price: 3500, stock: 8, story: "매일 아침 5시, 비건버터를 직접 만들어 반죽에 섞습니다. 겉은 바삭, 속은 촉촉한 소금빵입니다." },
    "2": { name: "바게트", emoji: "🥖", price: 4000, stock: 5, story: "프랑스 전통 방식으로 24시간 저온 숙성한 바게트입니다." },
    "3": { name: "베이글", emoji: "🥯", price: 3000, stock: 0, time: "11:30", story: "뉴욕 스타일 쫄깃한 베이글. 끓는 물에 데친 후 오븐에서 구워냅니다." },
    "4": { name: "꿀고구마빵", emoji: "🍞", price: 4500, stock: 12, isNew: true, story: "제철 고창 꿀고구마를 듬뿍 넣은 신메뉴입니다." },
    "5": { name: "시나몬롤", emoji: "🧁", price: 4000, stock: 3, story: "스웨덴식 시나몬롤. 진한 시나몬과 비건 크림치즈 글레이즈." },
    "6": { name: "크루아상", emoji: "🥐", price: 3500, stock: 0, story: "27겹의 레이어로 만든 버터 향 가득한 크루아상." },
    "7": { name: "단팥빵", emoji: "🥮", price: 3000, stock: 6, story: "100% 국산 팥으로 만든 달콤한 단팥빵입니다." },
    "8": { name: "치아바타", emoji: "🍞", price: 3500, stock: 4, story: "이탈리아 전통 치아바타. 올리브오일과 함께 즐겨보세요." },
};

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const bread = breadData[id || "1"];
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (!id || !bread) return;
        addToCart({
            id: parseInt(id),
            name: bread.name,
            emoji: bread.emoji,
            price: bread.price,
        });
        Alert.alert("장바구니", `${bread.name}을(를) 담았어요!`, [
            { text: "계속 쇼핑", style: "cancel" },
            { text: "장바구니 보기", onPress: () => router.push("/(tabs)/cart") }
        ]);
    };
    if (!bread) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>상품을 찾을 수 없습니다.</Text>
            </SafeAreaView>
        );
    }

    const isSoldOut = bread.stock === 0 && !bread.time;
    const isScheduled = bread.stock === 0 && bread.time;

    return (
        <SafeAreaView style={styles.container}>
            {/* 헤더 */}
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>← 뒤로</Text>
                </Pressable>
            </View>

            <ScrollView>
                {/* 이미지 영역 */}
                <View style={styles.imageContainer}>
                    <Text style={styles.emoji}>{bread.emoji}</Text>
                    {bread.isNew && (
                        <View style={styles.newBadge}>
                            <Text style={styles.newBadgeText}>NEW</Text>
                        </View>
                    )}
                </View>

                {/* 정보 영역 */}
                <View style={styles.infoContainer}>
                    <View style={styles.titleRow}>
                        <Text style={styles.name}>{bread.name}</Text>
                        <Text style={styles.price}>₩{bread.price.toLocaleString()}</Text>
                    </View>

                    {/* 상태 표시 */}
                    {bread.stock > 0 && (
                        <Text style={styles.stockText}>🔥 {bread.stock}개 남음</Text>
                    )}
                    {isScheduled && (
                        <Text style={styles.scheduledText}>⏰ {bread.time} 출고 예정</Text>
                    )}
                    {isSoldOut && (
                        <Text style={styles.soldoutText}>품절</Text>
                    )}

                    {/* 스토리 */}
                    <View style={styles.storyContainer}>
                        <Text style={styles.storyTitle}>📖 스토리</Text>
                        <Text style={styles.storyText}>{bread.story}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* 하단 버튼 */}
            <View style={styles.footer}>
                {bread.stock > 0 ? (
                    <Pressable style={styles.addButton} onPress={handleAddToCart}>
                        <Text style={styles.addButtonText}>🛒 장바구니 담기</Text>
                    </Pressable>
                ) : isScheduled ? (
                    <Pressable style={styles.notifyButton}>
                        <Text style={styles.notifyButtonText}>🔔 출고 알림받기</Text>
                    </Pressable>
                ) : (
                    <View style={styles.disabledButton}>
                        <Text style={styles.disabledButtonText}>품절</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    header: {
        padding: 16,
    },
    backButton: {
        paddingVertical: 8,
    },
    backText: {
        fontSize: 16,
        color: '#43A047',
    },
    imageContainer: {
        height: 280,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: {
        fontSize: 120,
    },
    newBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#4CAF50',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    newBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    infoContainer: {
        padding: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212121',
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#43A047',
    },
    stockText: {
        fontSize: 14,
        color: '#FF7043',
        marginTop: 8,
    },
    scheduledText: {
        fontSize: 14,
        color: '#FFA726',
        marginTop: 8,
    },
    soldoutText: {
        fontSize: 14,
        color: '#9E9E9E',
        marginTop: 8,
    },
    storyContainer: {
        marginTop: 24,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    storyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212121',
        marginBottom: 8,
    },
    storyText: {
        fontSize: 15,
        color: '#616161',
        lineHeight: 24,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    addButton: {
        backgroundColor: '#43A047',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    notifyButton: {
        backgroundColor: '#FFA726',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    notifyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    disabledButtonText: {
        color: '#9E9E9E',
        fontSize: 16,
        fontWeight: 'bold',
    },
});