import React from 'react';
import { View, StyleSheet ,TouchableWithoutFeedback} from 'react-native';
import colors from '../../config/colors';
import { MaterialCommunityIcons,Ionicons,EvilIcons,FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

function ListingsButton({onPress,name='plus-circle'}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.container}>
        <MaterialCommunityIcons size={40} name={name} color={colors.white}/>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
  backgroundColor:colors.secondary,
  color:colors.white,
  height:70,
  width:70,
  borderRadius:35,
  bottom:33,
  borderColor:colors.white,
  borderWidth:10,
  justifyContent:"center",
  alignItems:'center',
  }
});

export default ListingsButton;