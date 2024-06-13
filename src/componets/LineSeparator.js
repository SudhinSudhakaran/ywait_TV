import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LineSeparator = ({style}) => {
  return <View style={{backgroundColor: '#989898', width: 1, marginHorizontal:5, ...style}} />;
};

export default LineSeparator;

const styles = StyleSheet.create({});
