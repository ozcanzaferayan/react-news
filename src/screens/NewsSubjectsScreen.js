import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Button, ThemeProvider, ListItem, Card, ImageResizeMode, Header, Tile } from 'react-native-elements';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import prettyTime from '../util/timeUtil';
export default class NewsSubjectsScreen extends Component {
  static navigationOptions = {
    title: `İlgi Alanları`,
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [
        {title: 'Teknoloji', urlToImage: 'https://images.unsplash.com/photo-1478358161113-b0e11994a36b?auto=format&fit=crop&w=634&q=80'},
        {title: 'Spor', urlToImage: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=500&q=60'},

    ]
      
      //["Teknoloji", "Spor", "Sağlık", "Politika", "Ekonomi", "Eğitim", "Müzik", "Tiyatro", "Sinema"]
    }
    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._gotoNewsSubject = this._gotoNewsSubject.bind(this);
  }

  _keyExtractor(item, index) {
    return index.toString();
  }

  
  _renderItem({ item }) {
    return (
    <View  style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
    <Tile style={{
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  }}
     
      imageSrc={{uri: item.urlToImage}}
      title={item.title}
      featured
    />
    </View>
    );
  }

  //https://images.unsplash.com/photo-1478358161113-b0e11994a36b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80

  _gotoNewsSubject(item){
    this.props.navigation.navigate('Headlines', {section: item});
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{
        justifyContent: 'center',
        flex: 1,
        paddingTop: 30,
      }}>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.dataSource}
          numColumns={3}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}