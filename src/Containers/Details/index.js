import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
  Platform,
  Linking,
  TouchableOpacity
} from 'react-native';
import { Card, Image, Text } from 'react-native-elements';
import SafariView from 'react-native-safari-view';

class Details extends PureComponent {

  toWebView = (url) => {
    if (Platform ==='ios') {
    SafariView.isAvailable()
      .then(() => {
        SafariView.show({ url: url })
      })
      .catch(() => {
        Alert.alert('Sorry, something went wrong!')
      });
    }
    else {
      Linking.canOpenURL(url)
        .then(() => {
          Linking.openURL(url)
        })
        .catch(() => {
          Alert.alert('Sorry, something went wrong!')
        })
    }
  }

  render() {
    const { navigation } = this.props;
    const elem = navigation.getParam('elem');

    return (
      <View>
        <ScrollView 
          contentInsetAdjustmentBehavior="automatic"
        >
          <Card>
            <Image 
              source={{
                uri:
                  elem.urlToImage ||
                  'https://lh3.googleusercontent.com/0HbR3KT4N5b8jwhmLEieVnjzuU0qdzOWh-juElcId3-lTGNxFWaIyF-3Yn8cpbvk4ps'
              }}
              style={{ height: 300, resizeMode: 'cover' }}
            />
            <Text h4 style={{ marginTop: 5 }}>{elem.title}</Text>
            <Text style={{ marginTop: 10 }}>{elem.content}</Text>
            <Text style={{ marginBottom: 5, marginTop: 15, color: 'grey' }}>{'To continue look at:'}</Text>
            <TouchableOpacity onPress={() => this.toWebView(elem.url)}>
              <Text style={{ marginBottom: 15, color: 'lightblue' }}>{elem.url}</Text>
            </TouchableOpacity>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default Details