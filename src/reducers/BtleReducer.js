import {
  BTLE_AVAILABLE_SERVICES,
  BTLE_START,
  BTLE_SCANNING,
  BTLE_DATA_RECEIVED,
  BTLE_TOGGLE_SCAN,
  BTLE_STOP_SCAN,
  BTLE_DISCOVERD_PERIPHERALS,
  BTLE_CURRENT_DEVICE,
  BTLE_CONNECTED_DEVICE,
  BTLE_NOTIFICATION_STARTED,
  BTLE_SENSOR_ENABLED,
  BTLE_CHARACTERISTIC_HAS_UPDATED,
  BTLE_NO_OP,
  BTLE_READ_DATA
} from '../actions/types';

//Need to create an INITIAL_STATE for the BTLE connection status message
const INITIAL_STATE = { 
  btleScan: false,
  btleData: '',
  btleStart: '',
  btleScanning: false,
  btleScanningResults: '',
  btleDiscoveredPeripherals: '',
  btleCurrentDevice: '',
  btleConnectedDevice: '',
  btleNotificationStarted: false,
  btleSensorEnabled: false,
  btleCharacteristicUpdate: '',
  services: ''
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BTLE_START:
          console.log('Caught BTLE_START');
          return { ...state, btleStart: action.payload };
        case BTLE_SCANNING:
          console.log('Caught BTLE_SCANNING');
          return { ...state, btleScan: action.payload };
        case BTLE_STOP_SCAN:
          console.log('Caught BTLE_STOP_SCAN');        
          return state;
        case BTLE_DATA_RECEIVED:
          console.log('Caught BTLE_DATA_RECEIVED');
          return { ...state, btleData: action.payload };
        case BTLE_TOGGLE_SCAN:
          console.log('Caught BTLE_TOGGLE_SCAN action: ', action.payload);
          return { ...state, btleScanning: action.payload };
        case BTLE_DISCOVERD_PERIPHERALS:
          console.log('Caught BTLE_DISCOVERD_PERIPHERALS: ', action.payload);
          return { ...state, btleDiscoveredPeripherals: action.payload };
        case BTLE_CURRENT_DEVICE:
          console.log('Caught BTLE_CURRENT_DEVICE: ', action.payload);
          return { ...state, btleCurrentDevice: action.payload };
        case BTLE_CONNECTED_DEVICE:
          console.log('Caught BTLE_CONNECTED_DEVICE: ', action.payload);
          return { ...state, btleConnectedDevice: action.payload };
        case BTLE_SENSOR_ENABLED:
          console.log('Caught BTLE_SENSOR_ENABLED: ', action.payload);
          return { ...state, btleSensorEnabled: action.payload };        
        case BTLE_NOTIFICATION_STARTED:
          console.log('Caught BTLE_NOTIFICATION_STARTED: ', action.payload);
          return { ...state, btleNotificationStarted: action.payload };
        case BTLE_CHARACTERISTIC_HAS_UPDATED:
          return { ...state, 
                   btleCharacteristicUpdate: action.payload.data
          }; 
        case BTLE_AVAILABLE_SERVICES:
          console.log('Caught BTLE_AVAILABLE_SERVICES: ', action.payload);
          return { ...state, services: action.payload };
        case BTLE_NO_OP:
          console.log('Caught BTLE_NO_OP: ', action.payload);
          return state;
        case BTLE_READ_DATA:
          console.log('Caught BTLE_READ_DATA: ', action.payload);
          return { ...state, readData: action.payload };
          
        default:
          return state;
    }
};
