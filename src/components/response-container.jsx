import { Component } from "react";
import { Text, View } from "react-native";

export default function ResponseContainer(props) {
    return (
      <View style={[{
        width: '60%',
        backgroundColor: '#151515',
        marginTop: 20,
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 25,
      }, props.userMsg ? {
        marginLeft: 150,
      } : null]}>
        <Text style={{ color: '#fff' }}>
          {props.msg}
        </Text>
      </View>
    )
}
