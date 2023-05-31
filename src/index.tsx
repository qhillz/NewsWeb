import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import Header from './Component/Header'
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';
import Category from './Modules/Category'
import NewsTopContainer from './Component/Containers/NewsTopContainer';
import NewsMiddleContainer from './Component/Containers/NewsMiddleContainer';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const queryClient = new QueryClient();
const store = legacy_createStore(Category);

console.log(store.getState());
window.localStorage.clear();

root.render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <Header />
    <NewsTopContainer />
    <NewsMiddleContainer />
    {/* <ReactQueryDevtools initialIsOpen={true}/> */}
  </QueryClientProvider>  
  </Provider>
);