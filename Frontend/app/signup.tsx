// 회원가입 화면: 이메일/비밀번호/이름 입력 후 서버에 회원가입 요청을 보낸다.
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { signup } from '../src/api/authApi';

export default function SignupScreen() {
  // 폼 상태 (이메일/비밀번호/이름)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // 화면에 에러/결과 메시지 노출

  // 회원가입 제출 핸들러
  const handleSubmit = async () => {
    if (!email || !password || !name) {
      Alert.alert('알림', 'email, password, name을 모두 입력해주세요.');
      return;
    }
    try {
      setLoading(true);
      setMessage('');
      const res = await signup({ email, password, name });
      console.log('[signup] response:', res);
      if (res?.success) {
        const userEmail = res?.data?.user?.email ?? email;
        setMessage(`회원가입 성공: ${userEmail}`);
      } else {
        const msg = res?.error?.message || '회원가입에 실패했습니다.';
        setMessage(msg);
      }
    } catch (e) {
      console.error('[signup] error:', e);
      setMessage('네트워크 오류 또는 서버 오류가 발생했습니다. (F12 개발자도구 콘솔 확인)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

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

      <Text style={styles.label}>이름</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />

      <Button title={loading ? '진행중...' : '회원가입'} onPress={handleSubmit} disabled={loading} />
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


