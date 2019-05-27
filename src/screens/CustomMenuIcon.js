//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text,Image, TouchableOpacity, Clipboard, Alert, Share  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
import { Icon } from 'react-native-elements';
 
export default class CustomMenuIcon extends Component {
  _menu = null;
  setMenuRef = ref => {
    this._menu = ref;
  };
  showMenu = () => {
    this._menu.show();
  };
  hideMenu = () => {
    this._menu.hide();
  };
  onCopyLink = () => {
    this.hideMenu();
    Clipboard.setString(this.props.url);  
    setTimeout(() => {
      Alert.alert('Başarılı', 'Bağlantı kopyalandı.');
    }, 510); // Menü gizlenirken süre vermek gerekiyor aksi halde kapanıyor
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message: `${this.props.source}: ${this.props.title} ${this.props.url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onOpenBrowser = () => {
    this.hideMenu();
  };
  render() {
    return (
      <View  style={{marginRight: 16}}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
           <Icon
            name='more-vert'
            type='material'
            color='#fff'
          />
            </TouchableOpacity>
          }>
          <MenuItem onPress={this.onCopyLink}>Bağlantıyı Kopyala</MenuItem>
          <MenuItem onPress={this.onShare}>Paylaş...</MenuItem>
          <MenuItem onPress={this.onOpenBrowser}>Tarayıcıda Aç</MenuItem>
        </Menu>
      </View>
    );
  }
}