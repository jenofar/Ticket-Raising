import React from 'react';
import { View, StyleSheet, Modal,Text } from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
function UpLoadScreen({progress=0,visible=false}) {
  return (
    <Modal visible={visible}>
    <View style={styles.container}>
    {
      progress<1 ?
      (
        <Progress.Bar color='lightblue' progress={progress} width={200}></Progress.Bar>
      )
      : (
        
          <LottieView
        autoPlay
        // ref={animation}
        style={{  width: 300,
          height: 300,
          backgroundColor: '#eee',}}
          source={require('../../assets/animation/loading-unicorn.json')}>
        </LottieView>
        
      )
    }
    {/* <Text>{progress*100}%</Text> */}
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:"center",
    flex:1,
    justifyContent:"center"
  }
});

export default UpLoadScreen;