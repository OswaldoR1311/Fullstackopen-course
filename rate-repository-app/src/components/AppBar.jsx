import { View, StyleSheet } from "react-native";
import AppBarTab from "./AppBarTab";
import Constants from 'expo-constants'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },

})

const AppBar = () => {
  return (
   
      <View style={styles.container}>
       <AppBarTab title={'Repositories'}/>
      </View>
    
    
  )
}

export default AppBar