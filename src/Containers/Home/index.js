import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { connect } from 'react-redux';
import { Text, ListItem, ButtonGroup } from 'react-native-elements'
import { getSomeData, isFetching, getCategoriesData } from 'AppRedux';
import { CATEGORIES } from 'AppConstans';

class Home extends PureComponent {

  state = {
    refreshing: false,
    selectedIndex: -1
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

  updateIndex = selectedIndex => {
    const { isFetching, getCategoriesData } = this.props;

    this.setState({ selectedIndex });
    isFetching();
    getCategoriesData();
  };

  render() {
    const { someData, isLoading, message, navigation } = this.props;
    const buttons = ['ALL', ...CATEGORIES];
    return (
      <SafeAreaView>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 30 }}
        />
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
                    onPress={() => 
                      navigation.navigate('Details',
                        {
                          title: elem.title,
                          content: elem.content,
                          image: elem.urlToImage,
                        }
                      )
                    }
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
    message: state.home.message,
    categoryData: state.home.categoryData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isFetching: () => dispatch(isFetching()),
    getSomeData: () => dispatch(getSomeData()),
    getCategoriesData: () => dispatch(getCategoriesData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
