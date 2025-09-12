// 공통 인풋 컴포넌트
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export default function UIInput(props: TextInputProps) {
  return <TextInput {...props} style={[styles.input, props.style]} />;
}

const styles = StyleSheet.create({
  input: {
    width: 320,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
});


