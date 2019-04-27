import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class Login extends Component{
	
	constructor(props){
		super(props);
		this.state = {
				username: '',
				password: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
	
	async handleSubmit(event){
          event.preventDefault();
		  PostData('login', this.state).then((result) => {
		  let responseJSON = result;
		  console.log(responseJSON);
	    });
	}
	
	render(){
		return <div>
		<Container>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={this.state.username} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">Save</Button>{' '}
            <Button color="secondary" tag={Link} to="/">Cancel</Button>
          </FormGroup>
        </Form>
      </Container>
		</div>
	}
	
}
	
export function PostData(type, userData) {

	  let BaseUrl = 'http://localhost:8080/';

	  return new Promise((resolve, reject) => {
	    fetch(BaseUrl + type, {
	      method: 'POST',
	      headers:{
	    	   'Accept': 'application/json',
	    	   'Content-Type': 'application/json'
	      },
	      body: JSON.stringify(userData)
	    })
	    .then((response) => response.json())
	    .then((responseJson) => {
	      resolve(responseJson);
	    })
	    .catch((error) => {
	      reject(error);
	    });
	  });
	}

export default withRouter(Login);