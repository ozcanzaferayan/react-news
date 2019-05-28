//This is an example code for the popup menu//
import React, { Component } from 'react';
//import react in our code.
import { View, Text,Image, TouchableOpacity, Clipboard, Alert, Share, Linking  } from 'react-native';
//import all the components we are going to use.
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
//import menu and menu item
import { Icon } from 'react-native-elements';
import { fetchBookmarks, saveBookmarks, mergeBookmarks } from '../storage/bookmarkStorage';
 
export default class HeadlinesMenu extends Component {
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
  onSave = () => {
    this.hideMenu();
    this.props.onSave(this.props.headline);
  };
  onRemove = () => {
    this.hideMenu();
    this.props.onRemove(this.props.headline);
  };
  onNotInterested = () => {
    this.hideMenu();
  };
  render() {
    var isBookmarked = this.props.headline.isBookmarked;
    return (
      <View >
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableOpacity onPress={this.showMenu}>
           <Icon
            name='more-vert'
            type='material'
            size={20}
          />
            </TouchableOpacity>
          }>
          <MenuItem onPress={isBookmarked ? this.onRemove : this.onSave}>{isBookmarked ? 'Yer İmlerinden Kaldır' : 'Yer İmlerine Ekle'}</MenuItem>
          <MenuItem onPress={this.onNotInterested}>İlgilenmiyorum</MenuItem>
        </Menu>
      </View>
    );
  }
}