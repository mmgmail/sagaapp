import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements'
import { getSomeData, isFetching} from 'AppRedux';

class Home extends PureComponent {

  render() {
    const { someData, isLoading } = this.props;

    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {!!isLoading
            ? <ActivityIndicator /> 
            : <View>
              {someData && someData.articles.map((elem, idx) => (
                  <ListItem
                    key={idx}
                    leftAvatar={{ source: { uri: elem.urlToImage } }}
                    title={elem.title}
                    subtitle={elem.description}
                    bottomDivider
                    onPress={() => alert(1)}
                  />
                ))}
            </View>
          }
        </ScrollView>
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
)(Home);
