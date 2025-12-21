import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oeikpszpyajziwvqqwdp.supabase.co';
const supabaseKey = 'sb_publishable__WXa3g447gmDDjTfQ0rrrA_F-t31sJL';

export const supabase = createClient(supabaseUrl, supabaseKey);

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

// 카테고리 목록
export const CATEGORIES = [
    '전체',
    '소금빵',
    '베이글',
    '식빵',
    '치아바타',
    '루스틱',
    '깜빠뉴',
    '스콘',
    '샌드위치',
    '단팥빵',
    '토스트',
    '시나몬롤',
    '곰돌이 크림빵',
    '크림단팥빵',
    '크림베이글',
    '쿠키',
] as const;

export type Category = typeof CATEGORIES[number];