import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList'
import {Container} from 'reactstrap'
import ItemModal from './components/itemModal';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo"

import {Provider} from "react-redux";
import store from './store'

import './App.css';

const client = new ApolloClient({
  uri: "http:localhost:5000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}> 
   
    <Provider store={store}>
       <div className="App">
    <AppNavbar/>
    <Container> 
    <ItemModal/>
    <ShoppingList/>
    </Container>
  
    </div>
    </Provider>
    </ApolloProvider>
   
  );
}

export default App;
