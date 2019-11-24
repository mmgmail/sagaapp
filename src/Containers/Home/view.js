import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Text, ListItem, ButtonGroup } from 'react-native-elements';
import moment from 'moment';

const ContainerView = (
  {
    someData,
    categoryData,
    isLoading,
    message,
    navigation,
    buttons,
    selectedIndex,
    refreshing,
    scrollView,
    refreshData,
    updateIndex
  } = this.props
) => (
  <SafeAreaView>
    <ButtonGroup
      onPress={updateIndex}
      selectedIndex={selectedIndex + 1}
      buttons={buttons}
      containerStyle={{ height: 30 }}
      textStyle={{ fontSize: 8 }}
      innerBorderStyle={{ borderRadius: 15 }}
    />
    <ScrollView 
      contentInsetAdjustmentBehavior="automatic"
      ref={ref => scrollView({ ref: ref })}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshData}
        />
      }
    >
      {!!isLoading
        ? <ActivityIndicator size={'large'}/>
        : categoryData && selectedIndex !== -1
        ? <View>
        {categoryData[selectedIndex].articles.map((elem, idx) => (
            <ListItem
              key={idx}
              leftAvatar={
                elem.urlToImage
                  ? { source: { uri: elem.urlToImage } }
                  : { source: { uri: 'https://lh3.googleusercontent.com/0HbR3KT4N5b8jwhmLEieVnjzuU0qdzOWh-juElcId3-lTGNxFWaIyF-3Yn8cpbvk4ps' } }
              }
              title={elem.title}
              subtitle={
                <View>
                  <Text style={{ marginTop: 5, color: 'grey' }}>{elem.description}</Text>
                  <Text style={{ marginTop: 10, color: 'lightgrey', fontSize: 12 }}>{`Published at: ${moment(elem.publishedAt).format('LLL')}`}</Text>
                </View>
              }
              bottomDivider
              onPress={() => 
                navigation.navigate('Details', { elem })
              }
            />
          ))}
        </View>
        : someData && selectedIndex === -1
        ? <View>
          {someData.map(elem => (
              <ListItem
                key={elem.id}
                leftAvatar={
                  elem.urlToImage
                    ? { source: { uri: elem.urlToImage } }
                    : { source: { uri: 'https://lh3.googleusercontent.com/0HbR3KT4N5b8jwhmLEieVnjzuU0qdzOWh-juElcId3-lTGNxFWaIyF-3Yn8cpbvk4ps' } }
                }
                title={elem.title}
                subtitle={
                  <View>
                    <Text style={{ marginTop: 5, color: 'grey' }}>{elem.description}</Text>
                    <Text style={{ marginTop: 10, color: 'lightgrey', fontSize: 12 }}>{`Published at: ${moment(elem.publishedAt).format('LLL')}`}</Text>
                  </View>
                }
                bottomDivider
                onPress={() => 
                  navigation.navigate('Details', { elem })
                }
              />
            ))}
          </View>
        : message
        ? <Text>{`Something went wrong!\n${message}`}</Text>
        : null
      }
      <View style={{ paddingBottom: 40 }} />
    </ScrollView>
  </SafeAreaView>
);

export default ContainerView;
