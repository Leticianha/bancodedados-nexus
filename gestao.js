import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Gestao = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo, Gestão!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F224A'
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Poppins-Regular'
  }
});

export default Gestao;
