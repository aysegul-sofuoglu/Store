import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const Input = ({placeholder, value, onChangeText, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}></TextInput>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
