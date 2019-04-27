import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import PostDetails from './post/PostDetails';
import NewPost from './post/NewPost';
import Login from './user/Login';
import Register from './user/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
	  return (
	      <Router>
		      <Switch>
	      		<Route path='/' exact={true} component={Home}/>
	      		<Route path='/post/new' component={NewPost}/>	
	      		<Route path='/post/:id' component={PostDetails}/>
	      		<Route path='/signin' component={Login}/>
	      		<Route path='/register' component={Register}/>
	      	</Switch>
	      </Router>
	    )
  }
}

export default App;