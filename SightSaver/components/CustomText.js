import React from 'react';
import { Text } from 'react-native';

export function StyledText(props) {
  return <Text style={{ fontFamily: 'Outfit-Light', ...props.style }}>{props.children}</Text>;
}