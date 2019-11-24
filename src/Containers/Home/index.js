import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import {
  getSomeData,
  isFetching,
  getCategoriesData,
  setSeenArticles
} from 'AppRedux';
import { CATEGORIES } from 'AppConstans';
import ContainerView from './view'

class Home extends PureComponent {

  state = {
    refreshing: false,
    selectedIndex: -1,
    stateSeenArticles: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const {
      isFetching,
      getSomeData,
      getCategoriesData
    } = this.props;
    isFetching();
    getSomeData();
    getCategoriesData();
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
    this.scrollView.scrollTo({ x: 0, y: 0 });
    this.setState({ selectedIndex: selectedIndex - 1 });
  };

  setStateSeen = async () => {
    await this.setState({ stateSeenArticles: [] });
    this.setState({ stateSeenArticles: this.props.seenArticles });
  };

  render() {
    const {
      someData,
      categoryData,
      isLoading,
      message,
      navigation,
      setSeenArticles
    } = this.props;

    const {
      selectedIndex,
      refreshing,
      stateSeenArticles
    } = this.state;

    const buttons = ['default', ...CATEGORIES];
    return (
      <ContainerView
        someData={someData}
        categoryData={categoryData}
        isLoading={isLoading}
        message={message}
        navigation={navigation}
        buttons={buttons}
        selectedIndex={selectedIndex}
        refreshing={refreshing}
        scrollView={ref => this.scrollView = ref.ref}
        refreshData={this.refreshData}
        updateIndex={this.updateIndex}
        setSeenArticles={setSeenArticles}
        setStateSeen={this.setStateSeen}
        stateSeenArticles={stateSeenArticles}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    someData: state.home.someData,
    isLoading: state.home.isLoading,
    message: state.home.message,
    categoryData: state.home.categoryData,
    seenArticles: state.home.seenArticles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isFetching: () => dispatch(isFetching()),
    getSomeData: () => dispatch(getSomeData()),
    getCategoriesData: () => dispatch(getCategoriesData()),
    setSeenArticles: title => dispatch(setSeenArticles(title))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
