import { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Header() {
    return (
      <View style={styles.headerContainer}>
        <Image style={styles.imgHeader} source={require('../../assets/chataihelp-logo.png')} />
        <Image style={styles.iconHeader} source={require('../../assets/icon-account.webp')} />
      </View>
    )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
    backgroundColor: '#000000', 
  },
  imgHeader: {
    height: 43, 
    width: 280

  },
  iconHeader: {
    height: 30, 
    width: 30,
  }
})