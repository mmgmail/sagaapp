import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getSomeData, isFetching, getCategoriesData } from 'AppRedux';
import { CATEGORIES } from 'AppConstans';
import ContainerView from './view'

class Home extends PureComponent {

  state = {
    refreshing: false,
    selectedIndex: -1
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { isFetching, getSomeData, getCategoriesData } = this.props;
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
    if (selectedIndex - 1 === -1) {
      this.setState({ selectedIndex: selectedIndex - 1 });
    } else {
      this.setState({ selectedIndex: selectedIndex - 1 });
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

    const {
      selectedIndex,
      refreshing
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
      />
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
