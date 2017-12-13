import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import BtleManager from './components/BtleManager';
import Manager from './components/Manager';

const RouterComponent = () => {
  return (
      <Router sceneStyle={{ paddingTop: 65 }}>
        <Scene key="main">
          <Scene 
          onLeft={() => Actions.btleManager()}
          leftTitle="Bluetooth"
          key="devices" 
          component={Manager} 
          title="Manager"
          initial
          />
          <Scene key="btleManager" component={BtleManager} title="BTLE Controls" />
        </Scene>      
      </Router>
  );
};

export default RouterComponent;
