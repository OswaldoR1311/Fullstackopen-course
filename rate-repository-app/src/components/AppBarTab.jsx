import { Pressable, StyleSheet } from "react-native"
import Text from './Text'

const styles = StyleSheet.create({
  pressableStyle: {
    padding: 16
  }
})

const AppBarTab = ({title}) => {
  return (
     <Pressable style={styles.pressableStyle}>
        <Text fontSize={'subheading'} color={'textSecondary'} fontWeight={'bold'}>
           {title}
        </Text>
    </Pressable>
  )
}

export default AppBarTab