import { Component } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function Header() {
    return (
      <View style={styles.headerContainer}>
        <Image style={styles.imgHeader} source={require('../../assets/chataihelp-logo.png')} />
      </View>
    )
}

const styles = StyleSheet.create({
  headerContainer: {
    maxHeight: 100,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgHeader: {
    maxHeight: 50,
    resizeMode: 'contain'
  }
})