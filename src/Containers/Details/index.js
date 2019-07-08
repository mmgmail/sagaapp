import React, { PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Image, Text } from 'react-native-elements'

class Details extends PureComponent {

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    const content = navigation.getParam('content');
    const image = navigation.getParam('image');

    return (
      <View style={{ flex: 1 }}>
        <ScrollView 
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ flex: 1 }}
        >
          <Card>
            <Image source={{ uri: image }} style={{ height: 300, resizeMode: 'cover' }}/>
            <Text h4>{title}</Text>
            <Text>{content}</Text>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

export default Details