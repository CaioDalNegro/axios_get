import React, { useEffect, useState} from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import api from './src/devices/api';

// Declaração do componente principal 'App'
export default function App() {
// users - variavel de estado que conterá a lista de usuários
const [users, setUsers] = useState([]);

// Definer a URL da API que será usada para buscar os usuários
const API = "http:10.110.12.27:3000/users";

// Função assincrona para buscar os usuários da API
async function fetchUsers() {
  try{
    // Se a requisição dor bem-sucedida, atualiza o estado com os dados recebidos
    const response = await api.get(API);
    setUsers(response.data);
  }catch(error){
    // Se ocorrer erro, (ex: Falha de conexão), exibe o erro no console
    console.error("Erro GET:", error.message);
  }
}

// UseEffect - identificar o inicio do App e chama a função fetchUsers
useEffect(()=>{
  fetchUsers();
},[]);

const _render = () => {
  const vet = [];
  // Iteração no array 'users' para mostrar os usuários por meio de
  // Componentes View - será feito um a um.
  users.map((item, index) =>{
    vet.push(
      <View key={index}>
        <Text style={styles.item}>ID:{item.id} Nome:{item.name} Email:{item.email}</Text>
      </View>
    )
  })
  return vet;
}

// Retorno do componente 'App' - define a estrutura de interface
return(
  <View style={styles.container}>
    <Text style={styles.title}>GET - Listar Usuários</Text>
    <Button title="Recarregar Lista" onPress={fetchUsers}/>
    <ScrollView>
      {_render()}
    </ScrollView>
  </View>
);
}

// Definição dos styles
const styles = StyleSheet.create({
  container : {flex:1, padding:20, marginTop:40},
  title : {fontSize:22, fontWeight:"bold", marginBottom:10},
  item : {fontSize: 12, marginTop:10}
})
