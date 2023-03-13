import React from "react";
import { View, StyleSheet, Touchable,
  // Image,
   TouchableHighlight } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {Image} from "react-native-expo-image-cache";
import Text from "./Text";
import colors from "../config/colors";
import { TouchableOpacity ,TouchableWithoutFeedback} from "react-native-gesture-handler";

function Card({ title, subTitle, image,onPress,thumbnailUrl }) {
  console.log(image)
  // const navigation=useNavigation()
  return (
    <TouchableHighlight style={styles.card} onPress={onPress}>
    <View style={styles.card}>
      {/* <Image style={styles.image} uri={image} resizeMode="cover" preview={{uri:thumbnailUrl}} tint="light"/> */}
      {/* <Image style={styles.image} source={{uri:image}} /> */}
      <Image  style={styles.image} uri={image} tint={"light"} preview={{uri:thumbnailUrl}} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={2}>
          {subTitle}
        </Text>
      </View>
    </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});

export default Card;

// const Card = ({ title, subTitle, image, onPress }) => {

//   return (

//     <TouchableWithoutFeedback onPress={onPress}>

//     <View  style={styles.container}>

//       <Image  resizeMode="cover" source={{uri:image}} style={styles.image}></Image>

//       <View style={styles.detailsContainer}>

//         <Text style={styles.title}>{title}</Text>

//         <Text>{subTitle}</Text>

//       </View>

//     </View>

//     </TouchableWithoutFeedback>

//   );

// };

 

// const styles = StyleSheet.create({

//   container: {

//     //backgroundColor: "gray",

//     // flex: 1,

//     borderRadius: 15,

//     backgroundColor: "white",

//     overflow:"hidden"

//   },

//   detailsContainer:{

//       padding:10

//   },

//   image: {

//     height: 200,

//     width: "100%",

//   },

//   title:{

//       marginBottom:10,

//   },

// });

// export default Card;
