// API 기본 설정 파일 (웹/모바일 공통)
// 배포/로컬에 따라 EXPO_PUBLIC_API_BASE_URL 환경변수를 사용하고,
// 설정이 없으면 로컬 백엔드 기본 포트로 이어준다.

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000';


