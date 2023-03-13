import React from 'react';

import LottieView from "lottie-react-native"

const AppActivityIndicator = (visible) => {
    if(!visible){
        <LottieView
        autoPlay
        // ref={animation}
        style={{  width: 300,
          height: 300,
          backgroundColor: '#eee',}}
          source={require('../assets/animation/94829-loading.json')}>
        </LottieView>
    }
}

export default AppActivityIndicator;