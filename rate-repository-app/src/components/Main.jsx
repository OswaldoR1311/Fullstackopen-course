import { View, StyleSheet } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import { FlexboxExample } from './Text'

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'grey',
    flex: 1
  }
})

const Main = () => {
  return (
   <View style={styles.main}>
      <AppBar />
        {/* <FlexboxExample /> */}
      <RepositoryList />
   </View>
  )
}

export default Main