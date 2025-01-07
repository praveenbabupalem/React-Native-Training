import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

type ItemProps = {item: object};

const Item = ({item}: {item: {id: string; title: string; body: string}}) => (
  <View style={styles.itemContainer}>
    <Text>ID:{item.id}</Text>
    <Text>
      TITLE--
      {item.title}
    </Text>
    <Text>BODY---{item.body}</Text>
  </View>
);

class App extends Component {
  state = {
    data: [],
    isLoading: true,
  };

  onPressPatch = async () => {
    this.setState({isLoading: true});
    try {
      const response = await axios.patch(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          title: 'Patch',
        },
      );

      this.setState({data: [response.data], isLoading: false});
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  onPressDelete = async () => {
    this.setState({isLoading: true});
    try {
      const response = await axios.put(
        'https://jsonplaceholder.typicode.com/posts/1',
      );
      this.setState({data: [response.data], isLoading: false});
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  onPressPUT = async () => {
    this.setState({isLoading: true});
    try {
      const response = await axios.put(
        'https://jsonplaceholder.typicode.com/posts/1',
        {
          title: 'PUT',
        },
      );

      this.setState({data: [response.data], isLoading: false});
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  onPressPOST = async () => {
    this.setState({isLoading: true});
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        {
          title: 'POST',
          body: 'Added new item',
        },
      );

      this.setState({data: [response.data], isLoading: false});
    } catch (error) {
      Alert.alert(JSON.stringify(error));
    }
  };

  componentDidMount(): void {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
        );

        this.setState({data: response.data, isLoading: false});
      } catch (error) {
        Alert.alert(JSON.stringify(error));
      }
    };
    fetchData();
  }

  render() {
    const {data, isLoading} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.mainContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="orange" />
          ) : (
            <>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onPressPOST}>
                  <Text>POST</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onPressPUT}>
                  <Text>PUT</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onPressDelete}>
                  <Text>DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.onPressPatch}>
                  <Text>PATCH</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={data}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={item => item.id}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  itemContainer: {
    backgroundColor: 'whitesmoke',
    margin: 20,
    gap: 20,
    borderRadius: 20,
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 30,
    padding: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
  },
});
