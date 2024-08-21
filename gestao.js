import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const Gestao = ({ route }) => {
  const { userName, nif, senha } = route.params;
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBox}>
          <Image
            style={styles.profileIcon}
            source={require('./assets/perfilnexus.png')}
          />
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileNif}>NIF: {nif}</Text>
          <Text style={styles.eventsAdded}> <Text style={styles.eventsAdded2}>04</Text> {'\n'}Eventos adicionados</Text>
        </View>
        <View style={styles.dataSection}>
          <Text style={styles.dataTitle}>Consulte os seus  {'\n'}dados</Text>
          <View style={styles.dataContainer}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require('./assets/icon-perfil.png')}
              />
            </View>
            <TextInput
              style={styles.dataInput}
              value={userName}
              editable={false}
            />
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require('./assets/icon-senha.png')}
              />
            </View>
            <TextInput
              style={styles.dataInput}
              value={isPasswordVisible ? senha : '********'}
              editable={false}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
              <Image
                style={styles.eyeIcon}
                source={
                  isPasswordVisible
                    ? require('./assets/olhoAberto.png') // Imagem de olho aberto
                    : require('./assets/olhoClose.png') // Imagem de olho fechado
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.dataContainer}>
            <View style={styles.iconContainer}>
              <Image
                style={styles.icon}
                source={require('./assets/icon-nif.png')}
              />
            </View>
            <TextInput
              style={styles.dataInput}
              value={nif}
              editable={false}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Editar informações</Text>
          <Image
            source={require('./assets/seta-direita.png')} // Substitua pelo caminho correto da sua imagem
            style={styles.editButtonIcon}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  profileContainer: {
    width: '90%',
    marginTop: 20,
    padding: 8
  },
  profileBox: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 40,
    alignItems: 'center',
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  profileIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Bochan',
    color: '#44567F',
  },
  profileNif: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#7F7F7F',
  },
  eventsAdded: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: '#000',
    marginTop: 38,
    textAlign: 'center',
  },
  eventsAdded2: {
    color: '#44567F',
    fontWeight: 'bold',
  },
  dataSection: {
    padding: 8,
    width: '100%',
    marginBottom: 30,
  },
  dataTitle: {
    fontSize: 16,
    fontFamily: 'Bochan',
    color: '#44567F',
    marginBottom: 30,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  icon: {
    width: 45,
    height: 45,
  },
  dataInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#FFF',
    color: '#989898',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  eyeIcon: {
    width: 25,
    height: 25,
  },
  editButton: {
    backgroundColor: '#ffff',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 90,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    elevation: 5, 
  },
  editButtonIcon: {
    width: 30,
    height: 30, 
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#586683',
  },
});

export default Gestao;