import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
  Icon,
  List,
  ListItem
} from 'native-base';

import firebase from './firebase';

var data = [];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      listViewData: data,
      newTask: ''
    };
  }

  componentDidMount() {
    var that = this;

    firebase
      .database()
      .ref('/tasks')
      .on('child_added', function(data) {
        var newData = [...that.state.listViewData];
        newData.push(data);
        that.setState({ listViewData: newData });
      });
  }

  addRow(data) {
    var key = firebase
      .database()
      .ref('/tasks')
      .push().key;
    firebase
      .database()
      .ref('/tasks')
      .child(key)
      .set({ name: data });
  }

  deleteRow() {}

  showInfo() {}

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Content>
            <Item>
              <Input
                onChangeText={newTask => this.setState({ newTask })}
                placeholder='Add Something'
                style={styles.inputStyle}
              />
              <Button onPress={() => this.addRow(this.state.newTask)}>
                <Icon name='add' />
              </Button>
            </Item>
          </Content>
        </Header>
        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            rednerRow={data => (
              <ListItem>
                <Text>{data.val().name}</Text>
              </ListItem>
            )}
            renderLeftHiddenRow={data => (
              <Button full onPress={() => this.addRow(data)}>
                <Icon name='information-circle' />
              </Button>
            )}
            renderRightHiddenRow={(data, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={() => this.deleteRow(data, secId, rowId, rowMap)}
              >
                <Icon name='trash' />
              </Button>
            )}
            leftOpenValue={-75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inputStyle: {
    backgroundColor: '#f4f4f4',
    color: '#000'
  }
});
