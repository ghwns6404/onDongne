// 로그인 화면(분리): 시작 진입 화면. 하단에 회원가입 이동 버튼 제공.
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { login, getMe } from '../../src/api/authApi';
import UICard from '../../src/components/ui/Card';
import UIInput from '../../src/components/ui/Input';
import UIButton from '../../src/components/ui/Button';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage('email, password를 모두 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      const res = await login({ email, password });
      if (res?.success) {
        const t = res?.data?.accessToken ?? '';
        setToken(t);
        setMessage(`로그인 성공: ${res?.data?.user?.email || email}`);
      } else {
        setMessage(res?.error?.message || '로그인에 실패했습니다.');
      }
    } catch (e) {
      setMessage('네트워크 오류 또는 서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchMe = async () => {
    try {
      setLoading(true);
      setMessage('');
      const res = await getMe(token);
      if (res?.success) {
        setMessage(`내 정보: ${res.data.email} / ${res.data.name}`);
      } else {
        setMessage(res?.error?.message || '조회 실패');
      }
    } catch (e) {
      setMessage('네트워크 오류 또는 서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UICard>
      <Text style={styles.title}>로그인</Text>

      <Text style={styles.label}>이메일</Text>
      <UIInput autoCapitalize="none" keyboardType="email-address" placeholder="email@example.com" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>비밀번호</Text>
      <UIInput secureTextEntry placeholder="비밀번호" value={password} onChangeText={setPassword} />

      <UIButton title={loading ? '진행중...' : '로그인'} onPress={handleLogin} disabled={loading} />

      <View style={{ height: 8 }} />
      <UIButton title="내 정보 조회 (/me)" onPress={handleFetchMe} disabled={!token || loading} />

      <View style={{ height: 8 }} />
      <UIButton title="회원가입으로 이동" onPress={() => router.replace('/auth/signup')} />

      {!!message && <Text style={styles.message}>{message}</Text>}
    </UICard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { alignSelf: 'flex-start', marginTop: 8 },
  message: { marginTop: 12, color: '#333' },
});


