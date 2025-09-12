// 로그인 화면: 이메일/비밀번호 입력 후 서버에 로그인 요청을 보낸다.
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { login, getMe } from '../src/api/authApi';

export default function LoginScreen() {
  // 폼 상태 (이메일/비밀번호)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // 화면에 에러/결과 메시지 노출
  const [token, setToken] = useState(''); // 로그인 성공 시 받은 accessToken 저장

  // 로그인 제출 핸들러
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('알림', 'email, password를 모두 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      const res = await login({ email, password });
      console.log('[login] response:', res);
      if (res?.success) {
        const t = res?.data?.accessToken ?? '';
        setToken(t);
        const userEmail = res?.data?.user?.email ?? email;
        setMessage(`로그인 성공: ${userEmail}`);
      } else {
        const msg = res?.error?.message || '로그인에 실패했습니다.';
        setMessage(msg);
      }
    } catch (e) {
      console.error('[login] error:', e);
      setMessage('네트워크 오류 또는 서버 오류가 발생했습니다. (F12 개발자도구 콘솔 확인)');
    } finally {
      setLoading(false);
    }
  };

  // 토큰으로 내 정보 확인
  const handleFetchMe = async () => {
    try {
      setLoading(true);
      setMessage('');
      const res = await getMe(token);
      console.log('[me] response:', res);
      if (res?.success) {
        setMessage(`내 정보: ${res.data.email} / ${res.data.name}`);
      } else {
        const msg = res?.error?.message || '조회 실패';
        setMessage(msg);
      }
    } catch (e) {
      console.error('[me] error:', e);
      setMessage('네트워크 오류 또는 서버 오류가 발생했습니다. (F12 개발자도구 콘솔 확인)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <Text style={styles.label}>이메일</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="email@example.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>비밀번호</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
      />

      <Button title={loading ? '진행중...' : '로그인'} onPress={handleLogin} disabled={loading} />

      <View style={{ height: 8 }} />
      <Button title="내 정보 조회 (/me)" onPress={handleFetchMe} disabled={!token || loading} />

      {!!message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

// 단순한 화면 스타일 (웹/모바일 공용)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  message: {
    marginTop: 12,
    color: '#333',
  },
});


