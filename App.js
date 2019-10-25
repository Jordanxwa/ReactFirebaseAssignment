import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  SafeAreaView
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { addTask, getTask } from './tasks/tasks.js';

export default class App extends React.Component {
  state = {
    toDoList: [],
    currentListItem: null
  };

  // console log the list item when added
  onListItemAdded = item => {
    console.log('List Item Added!');
    console.log(item);
  };

  // a callback informing i've received the toDoList from firebase
  onListItemReceived = toDoList => {
    console.log(toDoList);
    this.setState(prevState => ({
      toDoList: (prevState.toDoList = toDoList)
    }));
  };

  componentDidMount() {
    getTask(this.onListItemReceived);
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder='Add Task'
            value={this.state.currentListItem}
            onChangeText={text =>
              this.setState(prevState => ({
                currentListItem: (prevState.currentListItem = text)
              }))
            }
          />
          <View style={{ marginTop: 45, marginRight: 15 }}>
            <Button
              title='Submit'
              onPress={() =>
                addTask(
                  {
                    name: this.state.currentListItem
                  },
                  this.onListItemAdded
                )
              }
            />
          </View>
        </View>

        <FlatList
          data={this.state.toDoList}
          ItemSeparatorComponent={() => (
            <Divider style={{ backgroundColor: 'black' }} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            console.log(item);
            return <ListItem title={item.name} onPress={() => {}} />;
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    marginTop: 45
  }
});
