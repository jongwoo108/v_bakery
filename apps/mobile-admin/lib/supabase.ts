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
}