import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { Dimensions, View, Button, Text, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import CustomMenuIcon from './CustomMenuIcon'

export default class HeadlineDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerRight: (
      <CustomMenuIcon
        menutext="Menu"
        url={navigation.state.params.url}
        source={navigation.state.params.source}
        title={navigation.state.params.title}
        menustyle={{
          marginRight: 16,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
        textStyle={{
          color: 'white',
        }}
        option1Click={() => {
          navigation.navigate('FirstPage');
        }}
        option2Click={() => { }}
        option3Click={() => { }}
        option4Click={() => {
        }}
      />
    )
  });

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <WebView
        source={{ uri: this.props.navigation.state.params.url }}
      />
    );
  }
}