import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements'
import { getSomeData, isFetching} from 'AppRedux';

class Details extends PureComponent {

  render() {
    const { someData, isLoading } = this.props;

    return (
      <SafeAreaView>
        <View style={{ flex: 1 }}>
          <ScrollView 
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ flex: 1 }}
          >
            {!!isLoading
              ? <ActivityIndicator /> 
              : <View>
                {someData && someData.articles.map((elem, idx) => 
                  <Text >{elem.title}</Text>
                  <ListItem
                    key={idx}
                    leftAvatar={{ source: { uri: elem.urlToImage } }}
                    title={elem.title}
                    subtitle={elem.description}
                  />
                )}
              </View>
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    someData: state.home.someData,
    isLoading: state.home.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isFetching: dispatch(isFetching()),
    getSomeData: dispatch(getSomeData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
