import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import fire from './fire';

class chat extends Component {
  // Configures how nav components will look and act
  // Passing a title property that will set title to state.params or default value of 'Chat!'
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!'
  });

  state = {
    messages: []
  };

  get user() {
    // Return our name and our UID for GiftedChat to parse
    return {
      name: this.props.navigation.state.params.name,
      _id: fire.shared.uid
    };
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        // ref for user and onSend method from fire.js
        onSend={fire.shared.send}
        user={this.user}
      />
    );
  }

  // setting up the callback to get messages then add it to current messages
  componentDidMount() {
    fire.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message)
      }))
    );
  }
  // unsubscribe from database when component leaves
  componentWillUnmount() {
    fire.shared.off();
  }
}

export default chat;
