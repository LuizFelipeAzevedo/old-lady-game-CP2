import { TouchableOpacity, Button, View, Text, StyleSheet, Image } from 'react-native';

// Trabalhar na parte visual da página inicial
const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Jogo da Idosa
        </Text>
        <Image source={'assets/jogo-da-velha.jpg'} style={styles.image} />

      {/* PÁGINA DE LOGIN */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
      {/* PÁGINA DE CADASTRO */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        backgroundColor: '#eee',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50, 
        color: '#b469ff'
    },
    image: {
      width: '80%',
      aspectRatio: 1
    },
    button: {
      backgroundColor: '#36ff9b',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20,
    }
  })

export default HomeScreen;