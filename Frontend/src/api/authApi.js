// 인증 관련 API 호출 래퍼
import { API_BASE_URL } from '../config/api';

export async function signup({ email, password, name }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getMe(accessToken) {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.json();
}


