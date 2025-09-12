// 회원가입 화면(분리): 하단에 로그인 이동 버튼 제공, 성공 시 로그인 화면으로 이동.
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { signup } from '../../src/api/authApi';
import UICard from '../../src/components/ui/Card';
import UIInput from '../../src/components/ui/Input';
import UIButton from '../../src/components/ui/Button';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !name) {
      setMessage('email, password, name을 모두 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      const res = await signup({ email, password, name });
      if (res?.success) {
        setMessage(`회원가입 성공: ${res?.data?.user?.email || email}`);
        // 회원가입 성공 후 로그인 화면으로 이동
        setTimeout(() => router.replace('/auth/login'), 600);
      } else {
        setMessage(res?.error?.message || '회원가입에 실패했습니다.');
      }
    } catch (e) {
      setMessage('네트워크 오류 또는 서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UICard>
      <Text style={styles.title}>회원가입</Text>

      <Text style={styles.label}>이메일</Text>
      <UIInput autoCapitalize="none" keyboardType="email-address" placeholder="email@example.com" value={email} onChangeText={setEmail} />

      <Text style={styles.label}>비밀번호</Text>
      <UIInput secureTextEntry placeholder="비밀번호" value={password} onChangeText={setPassword} />

      <Text style={styles.label}>이름</Text>
      <UIInput placeholder="이름" value={name} onChangeText={setName} />

      <UIButton title={loading ? '진행중...' : '회원가입'} onPress={handleSignup} disabled={loading} />

      <View style={{ height: 8 }} />
      <UIButton title="로그인으로 이동" onPress={() => router.replace('/auth/login')} />

      {!!message && <Text style={styles.message}>{message}</Text>}
    </UICard>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  label: { alignSelf: 'flex-start', marginTop: 8 },
  message: { marginTop: 12, color: '#333' },
});


