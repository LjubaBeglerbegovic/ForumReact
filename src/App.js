import React, {Component} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    posts: []
  };

  async componentDidMount() {
    const response = await fetch('/forum/posts');
    const body = await response.json();
    this.setState({ posts: body, isLoading: false });
  }

  render() {
    const {posts, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-intro">
            <h2>Posts</h2>
            <Table>
            	<thead>
            		<th>Date</th>
            		<th>Subject</th>
            	</thead>
	            {posts.map(post =>
	              <tr key={post.id}>
	              	<td>{new Date(post.creationDate).toLocaleDateString()} {new Date(post.creationDate).toLocaleTimeString()}</td>
	                <td>{post.subject}</td>
	              </tr>
	            )}
            </Table>
          </div>
        </header>
      </div>
    );
  }
}

export default App;