import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';

class NewPost extends Component{
	
	constructor(props){
		super(props);
		this.state = {
				post:{
					subject:'',
					message: ''
				}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	async handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    let post = {...this.state.post};
	    post[name] = value;
	    this.setState({post});
	  }
	
	async handleSubmit(event){
		const {post} = this.state;
		await fetch(`/forum/post`, {
			method: 'Post',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(post)
		})
		.then(this.props.history.push('/'))
		.catch(err => console.error('Caught error: ', err));
	}
	
	render(){
		const {post} = this.state;
		
		return <div className="container">
		<Container >
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>Subject</Label>
					<Input name="subject" id="subject" value={post.subject} onChange={this.handleChange} />
				</FormGroup>
				<FormGroup>
					<Label>Post</Label>
					<Input type="textarea" name="message" id="message" value={post.message} onChange={this.handleChange} />
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

export default withRouter(NewPost);