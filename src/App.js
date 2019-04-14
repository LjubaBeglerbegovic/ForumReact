import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import PostDetails from './Post/PostDetails';
import NewPost from './Post/NewPost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  render() {
	  return (
	      <Router>
		      <Switch>
	      		<Route path='/' exact={true} component={Home}/>
	      		<Route path='/post/new' component={NewPost}/>
	      		<Route path='/post/:id' component={PostDetails}/>
		      </Switch>
	      </Router>
	    )
  }
}

export default App;