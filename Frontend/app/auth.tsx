// 통합 인증 화면: 하나의 화면에서 로그인/회원가입을 전환하여 사용한다.
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { login, signup, getMe } from '../src/api/authApi';
import UICard from '../src/components/ui/Card';
import UIInput from '../src/components/ui/Input';
import UIButton from '../src/components/ui/Button';

export default function AuthScreen() {
  const router = useRouter();
  // 모드: 'login' | 'signup'
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // 공통 폼 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // 회원가입에서만 사용
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage('');
      if (mode === 'login') {
        const res = await login({ email, password });
        console.log('[auth:login] response:', res);
        if (res?.success) {
          const t = res?.data?.accessToken ?? '';
          setToken(t);
          setMessage(`로그인 성공: ${res?.data?.user?.email || email}`);
        } else {
          setMessage(res?.error?.message || '로그인 실패');
        }
      } else {
        const res = await signup({ email, password, name });
        console.log('[auth:signup] response:', res);
        if (res?.success) {
          setMessage(`회원가입 성공: ${res?.data?.user?.email || email}`);
          // 회원가입 성공 시 로그인 화면으로 이동(현재 단일 화면이므로 모드 전환)
          setTimeout(() => {
            setMode('login');
            // 별도 라우트 사용 시 아래 라우팅을 사용할 수 있음
            try { router.replace('/auth/login'); } catch {}
          }, 300);
        } else {
          setMessage(res?.error?.message || '회원가입 실패');
        }
      }
    } catch (e) {
      console.error('[auth] error:', e);
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
      console.log('[auth:me] response:', res);
      if (res?.success) {
        setMessage(`내 정보: ${res.data.email} / ${res.data.name}`);
      } else {
        setMessage(res?.error?.message || '조회 실패');
      }
    } catch (e) {
      console.error('[auth:me] error:', e);
      setMessage('네트워크 오류 또는 서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UICard>
      <Text style={styles.title}>{mode === 'login' ? '로그인' : '회원가입'}</Text>

      <View style={styles.switchRow}>
        <UIButton title="로그인" onPress={() => setMode('login')} disabled={mode === 'login'} />
        <View style={{ width: 8 }} />
        <UIButton title="회원가입" onPress={() => setMode('signup')} disabled={mode === 'signup'} />
      </View>

      <Text style={styles.label}>이메일</Text>
      <UIInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="email@example.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>비밀번호</Text>
      <UIInput
        secureTextEntry
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
      />

      {mode === 'signup' && (
        <>
          <Text style={styles.label}>이름</Text>
          <UIInput placeholder="이름" value={name} onChangeText={setName} />
        </>
      )}

      <UIButton
        title={loading ? '진행중...' : mode === 'login' ? '로그인' : '회원가입'}
        onPress={handleSubmit}
        disabled={loading}
      />

      <View style={{ height: 8 }} />
      <UIButton title="내 정보 조회 (/me)" onPress={handleFetchMe} disabled={!token || loading} />

      {!!message && <Text style={styles.message}>{message}</Text>}
    </UICard>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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


