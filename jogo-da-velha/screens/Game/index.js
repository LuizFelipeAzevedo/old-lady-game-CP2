import { useState } from 'react';
import { View } from 'react-native';
import EndGameDialog from '../../components/EndGameDialog'
import { getInitialTableState, fullTable, hasWinner } from './gameRules';
import GameTable from './Table';
import TurnRecorder from './TurnRecorder';
//import { FireBaseConfig } from './FireBaseConfig';
import firebase from 'firebase/app';
import 'firebase/database';

const PLAYERS_NAME = ['Jogador 1', 'Jogador 2'] // Cuidado!! PLAYERS_NAME[1] = 'Jogador 2'!! 
                                                // É preciso diminuir 1 do do index do tableState
                                                // para usar do jeito que estão pensando

const GameScreen = ({ navigation }) => {
  const [endGameDialog, setEndGameDialog] = useState(false)
  const [activePlayer, setActivePlayer] = useState(1);
  const [table, setTable] = useState(getInitialTableState());
  const [winner, setWinner] = useState();

  const endGameText = winner ? `O vencedor é ${winner}` : 'Deu Empate!!'

  const activePlayerName = PLAYERS_NAME[activePlayer - 1]

  const resetGame = () => {
    setEndGameDialog(false);
    setActivePlayer(1);
    setTable(getInitialTableState());
    setWinner(undefined);
  }

  const onCellClicked = (cellId) => {
    const newTable = table;
    newTable[cellId] = activePlayer;
    setTable(newTable);

    if (hasWinner(table, cellId)) {
      setWinner(activePlayerName);
      setEndGameDialog(true);

       // Salve o resultado do jogo no Realtime Database
       salvarResultadoJogo('vitoria'); // Assumindo que o jogador ativo é o vencedor

      return;
    }

    if (fullTable(table)) {
      setEndGameDialog(true);
      salvarResultadoJogo('empate');
      return; // não precisamos passar a vez
    }

    const nextPlayer = activePlayer === 1 ? 2: 1;
    setActivePlayer(nextPlayer);

  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <TurnRecorder
        playerName={activePlayerName}
        playerId={activePlayer}
      />
      <GameTable
        tableState={table}
        onCellClicked={onCellClicked}
      />
      <EndGameDialog
        isOpen={endGameDialog}
        resultText={endGameText}
        onClickYes={resetGame} // O que acontece se o jogador quiser jogar novamente?
        onClickNo={navigation.goBack} // Navegar de volta a tela de home
      />
    </View>
  );
}

const salvarResultadoJogo = (resultado) => {
 //Verifique se o usuário está autenticado
  const user = firebase.auth().currentUser;
 if (!user) {
    console.error('Usuário não autenticado!');
    return; 
  }

  const uid = user.uid;
  const database = firebase.database();
  const jogosRef = database.ref(`users/${uid}/jogos`);

  jogosRef.push().set({
    resultado,
    data: new Date().toISOString(),
  });
};

//if (!firebase.apps.length) {
 // firebase.initializeApp(FireBaseConfig);
//}



export default GameScreen;