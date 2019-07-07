import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements'
import { getSomeData, isFetching} from 'AppRedux';

class Home extends PureComponent {

  state = {
    refreshing: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { isFetching, getSomeData } = this.props;
    isFetching();
    getSomeData();
  };

  refreshData = () => {
    const { getSomeData } = this.props;
    this.setState({ refreshing: true });
    Promise.resolve(getSomeData()).then(() => {
      setTimeout(() => {
        this.setState({ refreshing: false });
      }, 600);
    });
  };

  render() {
    const { someData, isLoading, message } = this.props;

    return (
      <SafeAreaView>
        <ScrollView 
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refreshData}
            />
          }
        >
          {!!isLoading
            ? <ActivityIndicator size={'large'}/>
            : someData
            ? <View>
              {someData.map(elem => (
                  <ListItem
                    key={elem.id}
                    leftAvatar={{ source: { uri: elem.urlToImage } }}
                    title={elem.title}
                    subtitle={elem.description}
                    bottomDivider
                    onPress={() => {}}
                  />
                ))}
              </View>
            : message
            ? <Text>{`Something went wrong!\n${message}`}</Text>
            : null
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    someData: state.home.someData,
    isLoading: state.home.isLoading,
    message: state.home.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isFetching: () => dispatch(isFetching()),
    getSomeData: () => dispatch(getSomeData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
