/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { AppNavigator } from 'AppNavigation';
import rootReducer from './redux/reducers';
import rootSaga from './redux/sagas'

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const middleware = applyMiddleware(sagaMiddleware, logger);

const store = createStore(rootReducer, middleware);
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
