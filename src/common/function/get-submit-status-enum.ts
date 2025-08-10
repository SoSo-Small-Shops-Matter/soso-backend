/**
 * type과 status 값을 조합하여 submitStatus enum 번호(0~8)를 반환하는 함수
 *
 * enum 값 의미:
 * 0 → 최초 제보 - 확인 중
 * 1 → 최초 제보 - 승인됨
 * 2 → 최초 제보 - 거절됨
 * 3 → 운영 정보 수정 - 확인 중
 * 4 → 운영 정보 수정 - 승인됨
 * 5 → 운영 정보 수정 - 거절됨
 * 6 → 판매 정보 수정 - 확인 중
 * 7 → 판매 정보 수정 - 승인됨
 * 8 → 판매 정보 수정 - 거절됨
 *
 * @param type - 제보 유형 (0: 최초 제보, 1: 운영 정보 수정, 2: 판매 정보 수정)
 * @param status - 처리 상태 (0: 확인 중, 1: 승인됨, 2: 거절됨)
 * @returns 0~8 사이의 정수 값
 */
export function getSubmitStatusEnum(type: number, status: number): number {
  return type * 3 + status;
}
