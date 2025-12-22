import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

// Web에서 OAuth 세션 완료 처리
if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession();
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<{ error: any }>;
    signIn: (email: string, password: string) => Promise<{ error: any }>;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 현재 세션 가져오기
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });
        // 인증 상태 변화 감지
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );
        return () => subscription.unsubscribe();
    }, []);

    const signUp = async (email: string, password: string) => {
        const { error } = await supabase.auth.signUp({ email, password });
        return { error };
    };

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signInWithGoogle = async () => {
        if (Platform.OS === 'web') {
            // 웹: Supabase가 자동으로 리다이렉트 처리
            await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
        } else {
            // 모바일에서는 브라우저 열기
            const redirectTo = makeRedirectUri();
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo,
                    skipBrowserRedirect: true,
                },
            });
            if (data?.url) {
                const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
                if (result.type === 'success') {
                    const url = result.url;
                    const params = new URLSearchParams(url.split('#')[1]);
                    const accessToken = params.get('access_token');
                    const refreshToken = params.get('refresh_token');
                    if (accessToken && refreshToken) {
                        await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken,
                        });
                    }
                }
            }
        }
    };

    const signOut = async () => {
        try {
            // scope: 'local'로 서버 호출 없이 로컬 세션만 정리
            await supabase.auth.signOut({ scope: 'local' });
        } catch (error) {
            console.error('Sign out error:', error);
        }
        // 에러가 발생해도 상태 초기화
        setUser(null);
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
