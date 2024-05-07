import React, { useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CadastroScreen = ({ navigation }) => {
    const [formInputs, setFormInputs] = useState({ email: '', password: '' });

    const changePassword = (value) => {
        setFormInputs({ ...formInputs, password: value });
    }
    
    const changeEmail = (value) => {
        setFormInputs({ ...formInputs, email: value });
    }

    const signUp = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, formInputs.email, formInputs.password)
            .then((userCredential) => {
                const user = userCredential.user;
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Game')}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
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
            
                <Text style={styles.buttonText}>Cadastrar</Text>
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

export default CadastroScreen;
