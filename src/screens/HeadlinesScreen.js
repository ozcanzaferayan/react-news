import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { Button, ThemeProvider, ListItem, Card, ImageResizeMode, Header } from 'react-native-elements';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import prettyTime from '../util/timeUtil';

import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class HeadlinesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.section} Haberleri`
  });
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      newsType: this.props.navigation.state.params.section
    }
    this._fetchStory = this._fetchStory.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.component1 = this.component1.bind(this);
    this._gotoNewsSubject = this._gotoNewsSubject.bind(this);
  }

  componentDidMount() {
    this._fetchStory();
  }

  _fetchStory() {
    fetch(`https://newsapi.org/v2/everything?q=${this.state.newsType}&language=tr&apiKey=55d51f93924344e083d2f96a773ff0d1`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.articles,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  component1() { return <MIcon size={20} name='more-vert' />; }

  _keyExtractor(item, index) {
    return index.toString();
  }

  _gotoNewsSubject(item) {
    this.props.navigation.navigate('HeadlineDetail', { source: item.source.name, title: item.title, url: item.url });
  }

  _renderItem({ item }) {
    return (<ListItem
      title={
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height:55 }}>
          <Text style={{ flex: 1, textAlign: "left", fontSize: 15 }} >{item.title}</Text>
          <MIcon name='more-vert' size={20} />
        </View>
      }

      onPress={() => {this._gotoNewsSubject(item)}}
      subtitle={
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left' }}><MCIcon name='newspaper' /> {item.source.name}</Text>
          <Text style={{ textAlign: 'right' }}><MIcon name='access-time' /> {prettyTime(item.publishedAt)}</Text>
        </View>
      }
      leftAvatar={{
        size: "large",
        rounded: false,
        source: { uri: item.urlToImage, cache: "force-cache" }
      }}
      bottomDivider
    />
    );
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={this._keyExtractor}
          data={this.state.dataSource}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}