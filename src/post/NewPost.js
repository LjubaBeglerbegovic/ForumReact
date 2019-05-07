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
				},
				file:null,
				imagePreviewUrl: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleImageChange = this.handleImageChange.bind(this);
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
	
	async handleImageChange(event) {
		event.preventDefault();

	    let reader = new FileReader();
	    let file = event.target.files[0];

	    reader.onloadend = () => {
	      this.setState({
	    	file:file,
	        imagePreviewUrl: reader.result
	      });
	    }	    
	    reader.readAsDataURL(file);
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
		.then(res => {
			res.json().then(json => {
				const {file} = this.state;
				let data = new FormData();
			    data.append('file', file);
			    data.append('name', file.name);

				fetch(`/forum/post/${json.id}/image`, {
					method: 'POST',
					body: data
				})
			    });
			 
		})
		.then(this.props.history.push('/'))
		.catch(err => console.error('Caught error: ', err));
	}
	
	render(){
		const {post} = this.state;
		let {imagePreviewUrl} = this.state;
	    let $imagePreview = null;
	    if (imagePreviewUrl) {
	      $imagePreview = (<img src={imagePreviewUrl} style={{height: 300}} alt="Post"/>);
	    } else {
	      $imagePreview = (<div className="previewText">No image selected.</div>);
	    }
		
		return <div className="container">
		<Container >
			<Form onSubmit={this.handleSubmit}>
				<FormGroup>
					<Label>Subject</Label>
					<Input name="subject" id="subject" value={post.subject} onChange={this.handleChange} />
				</FormGroup>
				<div className="imgPreview" style={{padding:10}}>
		          {$imagePreview}
		        </div>
				<FormGroup>
					<Label>Post</Label>
					<Input type="textarea" name="message" id="message" value={post.message} onChange={this.handleChange} />
				</FormGroup>
				<FormGroup>
		        	<Input className="fileInput" type="file" name="file" id="file" onChange={this.handleImageChange}/>
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