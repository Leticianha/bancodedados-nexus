import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Image, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { db } from './firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Gestao from './gestao';
import Prof from './prof';
import SelectClass from './SelectClass';
import Attendance from './Attendance';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [nif, setNif] = useState('');
  const [senha, setSenha] = useState('');

  const alternarVisibilidadeSenha = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const [fontsLoaded] = useFonts({
    'Bochan': require('./assets/fonts/Bochan Serif.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLogin = async () => {
    try {
      const q = query(
        collection(db, 'gestao'),
        where('nif', '==', nif),
        where('senha', '==', senha)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userId = querySnapshot.docs[0].id;
        const userData = querySnapshot.docs[0].data(); // Pegando os dados do usuário
        navigation.navigate('Gestao', { userName: userId, nif: userData.nif, senha: userData.senha });
      } else {
        const qProfessores = query(
          collection(db, 'professores'),
          where('nif', '==', nif),
          where('senha', '==', senha)
        );
        const querySnapshotProfessores = await getDocs(qProfessores);

        if (!querySnapshotProfessores.empty) {
          const userId = querySnapshotProfessores.docs[0].id;
          const userData = querySnapshotProfessores.docs[0].data(); // Pegando os dados do usuário
          navigation.navigate('Prof', { userName: userId, nif: userData.nif, senha: userData.senha });
        } else {
          alert('NIF ou senha inválidos.');
        }
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };


  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.Tudo} onLayout={onLayoutRootView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              source={require('./assets/logo.png')}
            />
            <View style={styles.linhaLogo}></View>
            <Text style={styles.nomeApp}>Nexus Log</Text>
          </View>
          <Image
            style={styles.iconPerfil}
            source={require('./assets/icon-perfil.png')}
          />
        </View>
        <View style={styles.mainCard}>
          <View style={styles.cardContainer}>
            <View style={styles.curvaCard}></View>
            <View style={styles.cardGeral}>
              <View style={styles.card}>
                <View style={styles.bemvindo}>
                  <Text style={styles.h1Titulo}>Olá, membros!</Text>
                  <Text style={styles.pTitulo}>Entre para inserir informações exclusivas no grêmio.</Text>
                </View>
                <View style={styles.form}>
                  <View style={styles.rm}>
                    <Image
                      style={styles.iconNumber}
                      source={require('./assets/number.png')}
                    />
                    <View style={styles.linha}></View>
                    <TextInput
                      style={styles.input}
                      placeholder="Nif"
                      value={nif}
                      onChangeText={setNif}
                    />
                  </View>
                  <View style={styles.senha}>
                    <Image
                      style={styles.iconSenha}
                      source={require('./assets/senha.png')}
                    />
                    <View style={styles.linha}></View>
                    <TextInput
                      style={styles.input}
                      placeholder="Senha"
                      secureTextEntry={!senhaVisivel}
                      value={senha}
                      onChangeText={setSenha}
                    />
                    <TouchableOpacity onPress={alternarVisibilidadeSenha}>
                      <Image
                        style={styles.iconSenha}
                        source={senhaVisivel
                          ? require('./assets/olhoAberto.png') // Ícone de olho aberto
                          : require('./assets/olhoClose.png') // Ícone de olho fechado
                        }
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                    <Text style={styles.fazerLogin}>Fazer Login</Text>
                    <Image
                      style={styles.seta}
                      source={require('./assets/seta.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.barraCard}></View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="selectCLass">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Gestao" component={Gestao} options={{ title: 'Gestão' }} />
        <Stack.Screen name="Prof" component={Prof} options={{ title: 'Professor' }} />
        <Stack.Screen name="selectCLass" component={SelectClass} options={{ title: 'SelectClass' }} />
        <Stack.Screen name="Attendance" component={Attendance} options={{ title: 'Attendance' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Estilização Geral
  Tudo: {
    flex: 1,
    backgroundColor: '#0F224A',
  },
  container: {
    backgroundColor: '#0F224A', // Cor de fundo azul escuro
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: 'center',
    paddingEnd: '12%',
    paddingStart: '12%',
    paddingTop: '15%',
    justifyContent:'space-between',
  },
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 36
  },
  iconPerfil: {
    width: 55,
    height: 55
  },
  linhaLogo:{
    width:2,
    height:40,
    backgroundColor:'#D9D9D9',
    borderRadius:15,
    marginHorizontal:5,
    marginEnd:10
  },
  nomeApp:{
    fontFamily:'Bochan',
    color:'white',
    fontSize:16
  },

  // Main
  mainCard: {
    backgroundColor: '#0F224A', // Cor de fundo azul escuro
    alignItems: 'flex-end',
    height:440
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  cardGeral: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    height: 415,
    width: 302,
    paddingStart: 43,
    paddingBottom: 43,
    paddingTop: 43,
  },
  barraCard: {
    width: 45,
    height: 472,
    backgroundColor: 'white',
    borderBottomRightRadius: 40,
  },
  curvaCard: {
    backgroundColor: '#0F224A',
    width: 96,
    height: 58,
    borderBottomRightRadius: 55.65,
    position: 'relative',
    top: 57.2,
    zIndex: 2
  },
  rm: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7,
    paddingEnd: 10,
    paddingStart: 10,
    borderColor: '#44567F',
    borderWidth: 2,
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: '8%'

  },
  senha: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7,
    paddingEnd: 43,
    paddingStart: 10,
    borderColor: '#44567F',
    borderWidth: 2,
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: '5%'
  },
  iconSenha: {
    width: 28,
    height: 28
  },
  iconNumber: {
    width: 30,
    height: 33
  },
  linha: {
    backgroundColor: '#44567F',
    height: 36,
    width: 3.5,
    borderRadius: 15,
    marginHorizontal: 13
  },
  input: {
    width: '73%',
    height: '100%'
  },
  seta: {
    width: 35.3,
    height: 35.5
  },
  botao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingEnd: 12,
    paddingStart: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#E3ECFF',
    borderRadius: 8,
    marginBottom: '3.5%'
  },
  h1Titulo: {
    fontFamily: 'Bochan',
    fontSize: 24,
    width: 340,
    color: '#0F224A'
  },
  pTitulo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    paddingBottom: '3%',
    color: '#0F224A'
  },
  esqueciSenha: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#0F224A'
  },
  fazerLogin: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: '#0F224A'
  }
});