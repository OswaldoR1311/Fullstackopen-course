import { Text as NativeText, StyleSheet, View } from "react-native";
import theme from '../theme'

const styles = StyleSheet.create({
 text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal
 },
 colorTextSecondary: {
    color: theme.colors.textSecondary
 },
 colorPrimary: {
   color: theme.colors.primary
 },
 colorWhite: {
  color: theme.colors.white
 },
 fontSizeSubheading: {
   fontSize: theme.fontSizes.subheading
 },
 fontWeightBold: {
   fontWeight: theme.fontWeights.bold
 },

})

 const Text = ({color, fontSize, fontWeight, style, ...props}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
  ]

  return <NativeText style={textStyle} {...props} />
}

export const FlexboxExample = () => {
  return (
    <View style={theme.flexContainer}>
      <View style={theme.flexItemA}>
        <Text>Flex item A</Text>
      </View>
      <View style={theme.flexItemB}>
        <Text>Flex item B</Text>
      </View>
    </View>
  )
}

export default Text
