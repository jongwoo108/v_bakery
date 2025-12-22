import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://oeikpszpyajziwvqqwdp.supabase.co';
const supabaseKey = 'sb_publishable__WXa3g447gmDDjTfQ0rrrA_F-t31sJL';

// 웹에서는 localStorage, 네이티브에서는 AsyncStorage 사용
const storage = Platform.OS === 'web'
    ? undefined  // 웹에서는 기본 localStorage 사용
    : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        ...(storage && { storage }),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

export interface Bread {
    id: number;
    name: string;
    emoji: string;
    price: number;
    stock: number;
    status: 'active' | 'scheduled' | 'soldout';
    height: number;
    story: string;
    scheduled_time: string | null;
    is_new: boolean;
    image_url: string | null;
    category: string | null;
}