import { View, Text } from "react-native";

export default function HomeScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#FAFAFA', paddingTop: 50, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#212121' }}>
                🌿 안녕, 종우님
            </Text>
            <Text style={{ fontSize: 14, color: '#757575', marginTop: 8 }}>
                📅 12/21~25 이번 주 라인업
            </Text>

            <View style={{
                marginTop: 20,
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                borderWidth: 1,
                borderColor: '#E0E0E0'
            }}>
                <Text style={{ fontSize: 40, textAlign: 'center' }}>🥐</Text>
                <Text style={{ fontWeight: '500', marginTop: 8 }}>기본소금빵</Text>
                <Text style={{ fontSize: 12, color: '#FF7043' }}>🔥 8개 남음</Text>
            </View>
        </View>
    );
}