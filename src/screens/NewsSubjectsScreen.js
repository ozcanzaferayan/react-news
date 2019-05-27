import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Image, Dimensions, ImageBackground, TouchableHighlight } from 'react-native';
import { Button, ThemeProvider, ListItem, Card, ImageResizeMode, Header, Tile } from 'react-native-elements';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import prettyTime from '../util/timeUtil';

const numColumns = 3;
const imageUrlPrefix = "https://images.unsplash.com/photo-";
const imageUrlSuffix = "?auto=format&fit=crop&w=375&q=80";
const dataSource = [
  { title: 'Teknoloji', imageId: '1478358161113-b0e11994a36b' },
  { title: 'Spor', imageId: '1521412644187-c49fa049e84d' },
  { title: 'Sağlık', imageId: '1526256262350-7da7584cf5eb' },
  { title: 'Ekonomi', imageId: '1542222024-c39e2281f121' },
  { title: 'Eğitim', imageId: '1503676260728-1c00da094a0b' },
  { title: 'Müzik', imageId: '1511671782779-c97d3d27a1d4' },
  { title: 'Tiyatro', imageId: '1507924538820-ede94a04019d' },
  { title: 'Sinema', imageId: '1478720568477-152d9b164e26' },
  { title: 'Hava', imageId: '1530908295418-a12e326966ba' },
  { title: 'Seyahat', imageId: '1473625247510-8ceb1760943f' },
  { title: 'Astroloji', imageId: '1532968961962-8a0cb3a2d4f5' },
  { title: 'Otomobil', imageId: '1537041373298-55dbb337e651' },
  { title: 'Galeri', imageId: '1500051638674-ff996a0ec29e' },
  { title: 'Video', imageId: '1524253482453-3fed8d2fe12b' },
];
export default class NewsSubjectsScreen extends Component {
  static navigationOptions = {
    title: `İlgi Alanları`,
  };
  constructor(props) {
    super(props);
  }

  keyExtractor = (item, index) => {
    return index.toString();
  }

  renderItem = ({ item }) => {
    var tileWidth = Dimensions.get('window').width / numColumns;

    return (
      // <Tile
      //   onPress={() => { this.onPressSubject(item) }}
      //   contentContainerStyle={{fontSize: 5}}
      //   width={tileWidth}
      //   imageSrc={{ uri: imageUrlPrefix + item.imageId + imageUrlSuffix }}
      //   title={item.title}
      //   titleStyle={{height: 25, fontFamily: 'Futura', fontSize: 5}}
      //   featured={true}
      //   h3
      // />
      <View
        style={{
          flex: 1,
          width: tileWidth,
          height: tileWidth,
          maxWidth: tileWidth,
        }}>
        <TouchableHighlight onPress={() => { this.onPressSubject(item) }}>
          <ImageBackground
            source={{ uri: imageUrlPrefix + item.imageId + imageUrlSuffix }}
            style={{
              width: tileWidth,
              height: tileWidth,
              justifyContent: 'center'
            }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 15,
              color: '#fff'
            }}>{item.title}</Text>
          </ImageBackground>
        </TouchableHighlight>
      </View>
    );
  }
  onPressSubject = (item) => {
    this.props.navigation.navigate('Headlines', { section: item.title });
  }

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={dataSource}
        renderItem={this.renderItem}
        numColumns={3}
      />
    );
  }
}

