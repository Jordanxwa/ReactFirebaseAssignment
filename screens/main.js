import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';

class main extends Component {
  static navigationOptions = {
    title: 'Chat Bot'
  };

  state = {
    name: ''
  };

  onPress = () => {
    this.props.navigation.navigate('chat', { name: this.state.name });
  };

  onChangeText = name => this.setState({ name });

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeHolder='User Name'
          onChangeText={this.onChangeText}
          value={this.state.name}
        />

        <View style={{ marginLeft: 110, width: 160 }}>
          <Button
            onPress={this.onPress}
            color='black'
            title='Begin Chatting'
          ></Button>
        </View>
      </View>
    );
  }
}

const offset = 24;
const styles = StyleSheet.create({
  nameInput: {
    marginTop: 30,
    height: offset * 2,
    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 0.6,
    borderRadius: 5
  },
  title: {
    marginTop: 90,
    textAlign: 'center',
    fontSize: offset
  },
  buttonText: {
    textAlign: 'center',
    fontSize: offset
  }
});

export default main;
