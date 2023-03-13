import { View ,StyleSheet} from 'react-native'
import AppText from './Text';

const AdminList = ({AID,name}) => {
    return (
       <View style={{flexDirection:'row'}}>
            <AppText style={styles.text}>{AID}</AppText>
            <AppText style={styles.text}>{name}</AppText>
       </View> 
    );
}

export default AdminList;

const styles = StyleSheet.create({
    text:{
        flex:1,
        marginVertical:5
    }
})