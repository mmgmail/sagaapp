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
    const { getSomeData, getCategoriesData } = this.props;
    this.setState({ refreshing: true });
    if (this.state.index === -1) {
      Promise.resolve(getSomeData()).then(() => {
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 600);
      });
    }

    if (this.state.index !== -1) {
      Promise.resolve(getCategoriesData()).then(() => {
        setTimeout(() => {
          this.setState({ refreshing: false });
        }, 600);
      });
    }
  };

  updateIndex = selectedIndex => {
    if((selectedIndex - 1) === -1) {
      this.setState({ selectedIndex: selectedIndex - 1 });
      this.refreshData();
    } else {
      const { isFetching, getCategoriesData } = this.props;
      this.setState({ selectedIndex: selectedIndex - 1 });
      isFetching();
      getCategoriesData();
    }
  };

  render() {
    const {
      someData,
      categoryData,
      isLoading,
      message,
      navigation
    } = this.props;
    const buttons = ['ALL', ...CATEGORIES];
    return (
      <SafeAreaView>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={this.state.selectedIndex + 1}
          buttons={buttons}
          containerStyle={{ height: 30 }}
          textStyle={{ fontSize: 8 }}
          innerBorderStyle={{ borderRadius: 15 }}
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
            : categoryData && this.state.selectedIndex !== -1
            ? <View>
            {categoryData[this.state.selectedIndex].articles.map((elem, idx) => (
                <ListItem
                  key={idx}
                  leftAvatar={
                    elem.urlToImage
                      ? { source: { uri: elem.urlToImage } }
                      : { source: { uri: 'https://lh3.googleusercontent.com/0HbR3KT4N5b8jwhmLEieVnjzuU0qdzOWh-juElcId3-lTGNxFWaIyF-3Yn8cpbvk4ps' } }
                  }
                  title={elem.title}
                  subtitle={elem.description}
                  bottomDivider
                  onPress={() => 
                    navigation.navigate('Details',
                      {
                        title: elem.title,
                        content: elem.content,
                        image: elem.urlToImage || 'https://lh3.googleusercontent.com/0HbR3KT4N5b8jwhmLEieVnjzuU0qdzOWh-juElcId3-lTGNxFWaIyF-3Yn8cpbvk4ps',
                      }
                    )
                  }
                />
              ))}
            </View>
            : someData && this.state.selectedIndex === -1
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
                    subtitle={elem.description}
                    bottomDivider
                    onPress={() => 
                      navigation.navigate('Details',
                        {
                          title: elem.title,
                          content: elem.content,
                          image: elem.urlToImage || 'https://lh3.googleusercontent.com/0HbR3KT4N5b8jwhmLEieVnjzuU0qdzOWh-juElcId3-lTGNxFWaIyF-3Yn8cpbvk4ps',
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
