import { View, Text, StyleSheet } from "react-native"

// Esse componente deve mostrar o jogador ativo, ou seja,
// O que tem a jogada a fazer
const TurnRecorder = ({playerName, playerId}) => {
    return (<View style={{...styles.container, backgroundColor: playerId === 1 ? '#acf' : '#fca'}}>
        <Text style={styles.text}>
            {playerName}
        </Text>
    </View>)
}



const styles = StyleSheet.create({
    container: {
        width: '50%',
        borderWidth: 2,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingBottom: 2,
    }
})

// Após o jogo terminar, salve o resultado
//const novoJogoRef = jogosRef.push(); // Cria um novo nó com ID único
//novoJogoRef.set({
  //resultado: "vitoria", // Substitua pelo resultado real 
  //data: new Date().toISOString(), // Data atual
//});

//let vitorias = 0;
//let derrotas = 0;
//let empates = 0;

//snapshot.forEach((jogo) => {
  //const resultado = jogo.val().resultado;
  //if (resultado === "vitoria") {
   // vitorias++;
  //} else if (resultado === "derrota") {
   // derrotas++;
  //} else {
    //empates++;
 // }
//});

export default TurnRecorder;