import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, ListView, View } from 'react-native';
import { btleStartNotification, 
         btleDisconnect,
         btleListServices, 
         btleReadChar,
         btleSendRequest } from '../actions';
import { SERVICE, READ_CHARACTERISTIC, WRITE_CHARACTERISTIC } from '../actions/types.js';
import { Card, CardSection } from './common';
import { stringToBytes } from 'convert-string';

class Manager extends Component {

  onRowPress() {
    console.log('On Press Retrieve list of Available Services');
      this.props.btleListServices(this.props.device);
      this.props.btleStartNotification(this.props.device);
  }

  onPressThis() {
     console.log('Did we get data: ',
       this.props.btleReadChar(this.props.device, SERVICE, READ_CHARACTERISTIC));
  }
  
  onSendRequest() {
    console.log('Sending request for data...');
    var s = 'Hello Ed!!!';
    const d = stringToBytes(s);
    this.props.btleSendRequest(this.props.device, SERVICE, WRITE_CHARACTERISTIC, d);
  }
  onDisconnect(){
    this.props.btleDisconnect(this.props.device);
  }

  componentWillMount() {
    console.log('Retrieve list of Available Services');
    this.props.btleListServices(this.props.device);
    //need to figure out how to set this up so services are retrieved after choosing the peripheral
    //so when we first come up this view will be empty stating that the user should connect to device
    //then when returning to this view the user will see a list of available services to choose from
    //after choosing a service the user will have the option to press a button and initiate the retrieval
    //of emissions data to be sent back to the DMV servers...

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.device != this.props.device) {
      this.props.btleListServices(this.props.device);
      console.log('Available Services: ', this.props.sMap); 
      console.log('CONNECTED DEVICES: ', this.props.device); 
      console.log('Retrieve list of Available Services');
      //Now we have our services and characteristics!!!
      //We need to set things up so we can initiate and emissions inspection with the click of a button
      //1. dig through this data looking for those services and characteristics we need
      //2. interrogate the CAN Bus to retrieve the data we are looking for
      //3. perform some initial processing to package the data up properly
      //4. send data off to the MDV for inspection
      //5. receive results and let the user know.
    }
  }

  render() {
    return (
      <Card>
        <TouchableOpacity onPress={this.onRowPress.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.titleStyle}>
                Service Name: { this.props.sMap } 
              </Text>
            </CardSection>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressThis.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.titleStyle}>
                Read characteristic data: { this.props.rData } 
              </Text>
            </CardSection>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onSendRequest.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.titleStyle}>
                request emissions data: { this.props.rData } 
              </Text>
            </CardSection>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onDisconnect.bind(this)}>
          <View>
            <CardSection>
              <Text style={styles.titleStyle}>
                characteristic data: { this.props.device } 
              </Text>
            </CardSection>
          </View>
        </TouchableOpacity>
      </Card>
    );
  }
}

mapStateToProps = (state) => {
  const { services, btleConnectedDevice, readData } = state.btleReducer;
  const currentServices = services  !== ''
    ? services
    : [{name: 'No services found', id: 42}];
  console.log('Manager has services: ', currentServices);
  const sMap = _.map(currentServices, ({name, id}) => {
    return [name, id];
  });
  const device = btleConnectedDevice !== ''
    ? btleConnectedDevice
    : 'No device connected';
  const rData  = readData !== '' ? readData : 'Not Yet!!';

  return { device, sMap, rData };
};

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default connect(mapStateToProps,
   { 
    btleReadChar,
    btleSendRequest,
    btleStartNotification, 
    btleListServices,
    btleDisconnect
   })(Manager);

