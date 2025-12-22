import { View, Text, TextInput, Pressable, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const { signIn, signUp, signInWithGoogle } = useAuth();

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('알림', '이메일과 비밀번호를 입력하세요');
            return;
        }
        setLoading(true);
        const { error } = isLogin
            ? await signIn(email, password)
            : await signUp(email, password);
        setLoading(false);
        if (error) {
            Alert.alert('오류', error.message);
        } else {
            router.replace('/');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error: any) {
            Alert.alert('오류', error.message || 'Google 로그인에 실패했습니다');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.logo}>🍞 V-Bakery</Text>
                <Text style={styles.title}>{isLogin ? '로그인' : '회원가입'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="이메일"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Pressable
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? '처리중...' : (isLogin ? '로그인' : '회원가입')}
                    </Text>
                </Pressable>

                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>또는</Text>
                    <View style={styles.dividerLine} />
                </View>

                <Pressable style={styles.googleButton} onPress={handleGoogleSignIn}>
                    <Text style={styles.googleButtonText}>🔵 Google로 계속하기</Text>
                </Pressable>

                <Pressable onPress={() => setIsLogin(!isLogin)}>
                    <Text style={styles.switchText}>
                        {isLogin ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA', alignItems: 'center' },
    content: { flex: 1, justifyContent: 'center', padding: 24, width: '100%', maxWidth: 400 },
    logo: { fontSize: 48, textAlign: 'center', marginBottom: 8 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 32, color: '#212121' },
    input: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    button: {
        backgroundColor: '#43A047',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: { opacity: 0.6 },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 12,
        color: '#9E9E9E',
        fontSize: 14,
    },
    googleButton: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    googleButtonText: {
        color: '#212121',
        fontSize: 16,
        fontWeight: '600',
    },
    switchText: { color: '#43A047', textAlign: 'center', marginTop: 16 },
});