import { View, StyleSheet, Image } from "react-native"
import Text from './Text'

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    gap: 8,
    padding: 16,
    backgroundColor: 'white'
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 16
  },
  infoContainer: {
    paddingTop: 12,
    flexDirection: 'column',
    gap: 12,
    flex: 1,
  },
  countContainer: {
    alignItems: 'center'
  },
  languageStyles: {
    backgroundColor: '#3c65f9',
    padding: 6,
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 6
  }
})

const RepositoryItem = ({item}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.profileContainer}>
        <Image style={styles.profileImage} source={{ uri: item.ownerAvatarUrl }}/>
        <View style={styles.infoContainer}>
          <Text fontSize={'subheading'} fontWeight={'bold'}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <View style={styles.languageStyles}>
            <Text color={'white'}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <View style={styles.countContainer}>
          <Text fontWeight={'bold'}>{item.stargazersCount >= 1000 ? `${(item.stargazersCount/1000).toFixed(1)}k` : item.stargazersCount}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.countContainer}>
          <Text fontWeight={'bold'}>{item.forksCount >= 1000 ? `${(item.forksCount/1000).toFixed(1)}k` : item.forksCount}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.countContainer}>
          <Text fontWeight={'bold'}>{item.reviewCount}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.countContainer}>
          <Text fontWeight={'bold'}>{item.ratingAverage}</Text>
          <Text>Rating</Text>
       </View>
      </View>
    </View>
  )
}

export default RepositoryItem