export interface Bread {
    id: number;
    name: string;
    emoji: string;
    price: number;
    stock: number;
    status: "active" | "scheduled" | "soldout";
    height: number;
    story: string;
    scheduledTime?: string;  // "HH:MM" 형식 추가!
    isNew?: boolean;    //선택적(신메뉴 여부)
}

export const breads: Bread[] = [
    {
        id: 1,
        name: "기본소금빵",
        emoji: "🥐",
        price: 3500,
        stock: 8,
        status: "active",
        height: 130,
        story: "매일 아침 5시, 비건버터를 직접 만들어 반죽에 섞습니다. 겉은 바삭, 속은 촉촉한 소금빵입니다."
    },
    {
        id: 2,
        name: "바게트",
        emoji: "🥖",
        price: 4000,
        stock: 5,
        status: "active",
        height: 160,
        story: "프랑스 전통 방식으로 24시간 저온 숙성한 바게트입니다."
    },
    {
        id: 3,
        name: "베이글",
        emoji: "🥯",
        price: 3000,
        stock: 0,
        status: "scheduled",
        height: 140,
        story: "뉴욕 스타일 쫄깃한 베이글. 끓는 물에 데친 후 오븐에서 구워냅니다.",
        time: "11:30"
    },
    {
        id: 4,
        name: "꿀고구마빵",
        emoji: "🍞",
        price: 4500,
        stock: 12,
        status: "active",
        height: 120,
        story: "제철 고창 꿀고구마를 듬뿍 넣은 신메뉴입니다.",
        isNew: true
    },
    {
        id: 5,
        name: "시나몬롤",
        emoji: "🧁",
        price: 4000,
        stock: 3,
        status: "active",
        height: 150,
        story: "스웨덴식 시나몬롤. 진한 시나몬과 비건 크림치즈 글레이즈."
    },
    {
        id: 6,
        name: "크루아상",
        emoji: "🥐",
        price: 3500,
        stock: 0,
        status: "soldout",
        height: 130,
        story: "27겹의 레이어로 만든 버터 향 가득한 크루아상."
    },
    {
        id: 7,
        name: "단팥빵",
        emoji: "🥮",
        price: 3000,
        stock: 6,
        status: "active",
        height: 145,
        story: "100% 국산 팥으로 만든 달콤한 단팥빵입니다."
    },
    {
        id: 8,
        name: "치아바타",
        emoji: "🍞",
        price: 3500,
        stock: 4,
        status: "active",
        height: 135,
        story: "이탈리아 전통 치아바타. 올리브오일과 함께 즐겨보세요."
    },
]