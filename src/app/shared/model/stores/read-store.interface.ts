import { Category } from "./category.enum"

export interface ReadStore {
    store_id: number // ID
    user_id: number // 매니저 ID
    store_name: string // 가게명
    category: Category // 카테고리
    address: string // 주소
    latitude: number // 위도
    longitude: number // 경도
    contact_number: string // 전화번호
    description?: string // 설명 (선택적)
}