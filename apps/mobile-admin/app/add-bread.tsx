import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert, Platform, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../lib/supabase";

export default function AddBreadScreen() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [story, setStory] = useState("");
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("권한 필요", "카메라 권한이 필요합니다");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!imageUri) return null;

        try {
            const fileName = `bread_${Date.now()}.jpg`;
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const { data, error } = await supabase.storage
                .from("bread-images")
                .upload(fileName, blob, {
                    contentType: "image/jpeg",
                });

            if (error) {
                console.error("Upload error:", error);
                return null;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from("bread-images")
                .getPublicUrl(fileName);

            return urlData.publicUrl;
        } catch (error) {
            console.error("Upload error:", error);
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!name.trim()) {
            if (Platform.OS === 'web') {
                window.alert("빵 이름을 입력하세요");
            } else {
                Alert.alert("알림", "빵 이름을 입력하세요");
            }
            return;
        }

        setUploading(true);

        try {
            // Upload image if exists
            const imageUrl = await uploadImage();

            // Insert into database
            const { data, error } = await supabase.from("breads").insert({
                name: name.trim(),
                emoji: "🍞",
                price: parseInt(price) || 0,
                stock: 0,
                status: "active",
                height: 130,
                story: story.trim(),
                scheduled_time: null,
                is_new: true,
                image_url: imageUrl,
            });

            if (error) {
                if (Platform.OS === 'web') {
                    window.alert("빵 추가에 실패했습니다");
                } else {
                    Alert.alert("오류", "빵 추가에 실패했습니다");
                }
                console.error(error);
                return;
            }

            // 성공 - 바로 뒤로가기
            if (Platform.OS === 'web') {
                window.alert(`${name} 추가 완료!`);
                router.back();
            } else {
                Alert.alert("완료", `${name} 추가 완료!`, [
                    { text: "확인", onPress: () => router.back() }
                ]);
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backButton}>← 취소</Text>
                </Pressable>
                <Text style={styles.title}>빵 추가</Text>
                <Pressable onPress={handleSubmit} disabled={uploading}>
                    <Text style={[styles.saveButton, uploading && styles.disabled]}>
                        {uploading ? "저장중..." : "저장"}
                    </Text>
                </Pressable>
            </View>

            <ScrollView style={styles.form}>
                {/* Image Picker */}
                <View style={styles.imageSection}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.previewImage} />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.placeholderEmoji}>🍞</Text>
                        </View>
                    )}
                    <View style={styles.imageButtons}>
                        <Pressable style={styles.imageButton} onPress={pickImage}>
                            <Text>📷 갤러리</Text>
                        </Pressable>
                        <Pressable style={styles.imageButton} onPress={takePhoto}>
                            <Text>📸 촬영</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.field}>
                    <Text style={styles.label}>빵 이름 *</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="예: 소금빵"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>가격 (원)</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="number-pad"
                        placeholder="3500"
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>스토리</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={story}
                        onChangeText={setStory}
                        placeholder="이 빵만의 특별한 이야기..."
                        multiline
                        numberOfLines={4}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FAFAFA" },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#43A047",
    },
    backButton: { color: "white", fontSize: 16 },
    title: { fontSize: 18, fontWeight: "bold", color: "white" },
    saveButton: { color: "white", fontSize: 16, fontWeight: "bold" },
    disabled: { opacity: 0.5 },
    form: { flex: 1, padding: 16 },
    imageSection: { alignItems: "center", marginBottom: 24 },
    previewImage: { width: 150, height: 150, borderRadius: 12 },
    imagePlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
        justifyContent: "center",
    },
    placeholderEmoji: { fontSize: 64 },
    imageButtons: { flexDirection: "row", marginTop: 12, gap: 12 },
    imageButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: "#E0E0E0",
        borderRadius: 8,
    },
    field: { marginBottom: 16 },
    label: { fontSize: 14, color: "#616161", marginBottom: 6 },
    input: {
        backgroundColor: "white",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#E0E0E0",
    },
    textArea: { height: 100, textAlignVertical: "top" },
    row: { flexDirection: "row" },
});
