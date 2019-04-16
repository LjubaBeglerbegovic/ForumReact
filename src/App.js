import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import PostDetails from './Post/PostDetails';
import NewPost from './Post/NewPost';
import Login from './User/Login';
import Register from './User/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
	  return (
	      <Router>
		      <Switch>
	      		<Route path='/' exact={true} component={Home}/>
	      		<Route path='/post/new' component={NewPost}/>	
	      		<Route path='/post/:id' component={PostDetails}/>
	      		<Route path='/login' component={Login}/>
	      		<Route path='/register' component={Register}/>
	      	</Switch>
	      </Router>
	    )
  }
}

export default App;