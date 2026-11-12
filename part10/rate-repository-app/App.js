import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola estoy probando expo en el telefono jajaj que</Text>
      <StatusBar style="auto" />
      <Text>This is another text</Text>
      <Pressable style={{backgroundColor:'red', padding: 8, borderRadius: 4  }} onPress={() => Alert.alert('You have pressed the text!')}>
        <Text style={{color: 'white', fontSize: 20}}>You can press me</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
