import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [formInputs, setFormInputs] = useState({ email: '', password: '' });

    const changeEmail = (value) => {
        setFormInputs({ ...formInputs, email: value });
    }

    const changePassword = (value) => {
        setFormInputs({ ...formInputs, password: value });
    }

    const login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, formInputs.email, formInputs.password)
            .then((userCredential) => {
                const user = userCredential.user;
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Game')}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Lidar com erros de login, se necessário
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    value={formInputs.email}
                    onChangeText={changeEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    secureTextEntry={true}
                    value={formInputs.password}
                    onChangeText={changePassword}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Game')}>
            
                <Text style={styles.buttonText}>Entrar</Text>
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
        color: '#36ff9b'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: '#36ff9b',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
});

export default LoginScreen;
