// 공통 카드 레이아웃: 중앙 정렬, 최대 너비 지정
import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export default function UICard({ children, style, ...rest }: ViewProps) {
  return (
    <View style={styles.root}>
      <View style={[styles.card, style]} {...rest}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 12,
    elevation: 1,
  },
});


