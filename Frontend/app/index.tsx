// 앱 진입 시 기본 탭 화면 대신 회원가입 화면으로 즉시 이동한다.
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/auth/login" />;
}


