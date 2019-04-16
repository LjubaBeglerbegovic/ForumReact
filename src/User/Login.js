import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

class Login extends Component{
	
	constructor(props){
		super(props);
		this.state = {
				user:{
					username: '',
					password: '',
				}
		}
		this.handleSubmit = this.handleSubmit.bind();
	}
	
	async handleSubmit(event){
		event.preventDefault();
		await fetch('/login',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		});
		this.props.history.push('/posts');
	}
	
	render(){
		return <div>
		<Container>
        <h2>Login</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username"/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" />
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

export default withRouter(Login);