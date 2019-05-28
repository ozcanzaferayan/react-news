import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { ThemeProvider, ListItem, Card, ImageResizeMode, Header, Button } from 'react-native-elements';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements';
import prettyTime from '../util/timeUtil';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeadlineDetailMenu from './HeadlineDetailMenu';
import HeadlinesMenu from './HeadlinesMenu';
import { fetchBookmarks, saveBookmark, removeBookmark } from '../storage/bookmarkStorage';

export default class BookmarksScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Yer imleri`,
    headerRight: (
      <TouchableOpacity onPress={this.onMenuPress}>
      <MIcon style={{marginRight: 15, color: '#fff', fontSize: 25}} name='bookmark' />
      </TouchableOpacity>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    }
    this._fetchStory = this._fetchStory.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._gotoNewsSubject = this._gotoNewsSubject.bind(this);
    this.onMenuPress = this.onMenuPress.bind(this);
  }

  componentDidMount() {
    this._fetchStory();
  }

  onMenuPress = () => {
    console.log("pressed");
  }

  async _fetchStory() {
    let bookmarks = await fetchBookmarks();
    this.setState({
      isLoading: false,
      dataSource: bookmarks,
    });
  }

  onSaveBookmark = async (headline) => {
    await saveBookmark(headline);
    let headlines = this.state.dataSource.slice(0);
    headlines.forEach((h, i) => {
      if (h.url.includes(headline.url)) {
        headlines[i].isBookmarked = true;
      }
    });
    this.setState({
      dataSource: headlines,
    });
  };


  onRemoveBookmark = async (headline) => {
    await removeBookmark(headline);
    let headlines = this.state.dataSource.slice(0);
    headlines.forEach((h, i) => {
      if (h.url.includes(headline.url)) {
        headlines[i].isBookmarked = false;
      }
    });
    this.setState({
      dataSource: headlines,
    });
  };


  _keyExtractor(item, index) {
    return index.toString();
  }

  _gotoNewsSubject(item) {
    this.props.navigation.navigate('HeadlineDetail', { source: item.source.name, title: item.title, url: item.url });
  }

  _renderItem({ item }) {
    return (<ListItem
      title={
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 55 }}>
          <Text style={{ flex: 1, textAlign: "left", fontSize: 15 }} >{item.title}</Text>
          <HeadlinesMenu
            menutext="Menu"
            url="{navigation.state.params.url}"
            onSave={this.onSaveBookmark}
            onRemove={this.onRemoveBookmark}
            headline={item}
          />
        </View>
      }

      onPress={() => { this._gotoNewsSubject(item) }}
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