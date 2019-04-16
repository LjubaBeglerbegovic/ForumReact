import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from '../AppNavbar';

class Register extends Component{
	
	constructor(props){
		super(props);
		this.state = {
				user:{
					firstName: '',
					lastName: '',
					email: '',
					username: '',
					password: ''
				}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	async handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    let user = {...this.state.user};
	    user[name] = value;
	    this.setState({user});
	  }
	
	async handleSubmit(event){
		event.preventDefault();
		const{user} = this.state;
		await fetch('/forum/user',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		}).then(res => console.log('response: ', res))
		.catch(err => console.error('Caught error: ', err));
		this.props.history.push('/login');
	}
	
	render(){
		const {user} = this.state;
		return <div>
		<AppNavbar/>
		<Container>
        <h2>Register</h2>
        <Form onSubmit={this.handleSubmit}>
        <FormGroup>
	        <Label for="firstName">First Name</Label>
	        <Input type="text" name="firstName" id="firstName" value={user.firstName} onChange={this.handleChange}/>
	      </FormGroup>
	        <FormGroup>
	        <Label for="lastName">Last Name</Label>
	        <Input type="text" name="lastName" id="lastName" value={user.lastName} onChange={this.handleChange}/>
	      </FormGroup>
	        <FormGroup>
	        <Label for="email">Email</Label>
	        <Input type="email" name="email" id="email" value={user.email} onChange={this.handleChange}/>
	      </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" name="username" id="username" value={user.username} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" value={user.password} onChange={this.handleChange}/>
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

export default Register;