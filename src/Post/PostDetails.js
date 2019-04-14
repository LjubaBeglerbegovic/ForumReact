import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class PostDetails extends Component{
	
	constructor(props){
		super(props);
		this.state = {
				item:{
					creationDate:'',
					message: ''
				}, 
				comment: {
					commentText: ''
				},
				isLoading:true};
		this.handleChange = this.handleChange.bind(this);
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	}	
	
	async componentDidMount(){
		if(this.props.match.params.id !== 'new'){
			const post = await(await fetch(`/forum/post/${this.props.match.params.id}`)).json();
			this.setState({item:post, comment:{commentText:''}, isLoading:false});
		}
	}
	
	handleChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    let comment = {...this.state.comment};
	    comment[name] = value;
	    this.setState({comment});
	  }
	
	async handleCommentSubmit(event){
		await fetch(`/forum/comment/${this.state.item.id}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.comment)
		})
		.then(res => console.log('response: ', res))
		.catch(err => console.error('Caught error: ', err));
	}
	
	render(){
		const {item, comment, isLoading} = this.state;
		const dateTime = getDateTime(item.creationDate);
		if(isLoading){
			return <p> Loading... </p>
		}
		
		const comments = item.comments.map(comment=>{
			const postDate = getDateTime(comment.postDate);
			return <div key={comment.id} style={{marginTop:10}}>
			<div className="col-sm-4">
			{postDate}:
			</div>
			<div className="col-sm-4">
			{comment.commentText}
			</div>
			</div>
		});
		
		return <div className="container">
			<h2>{item.subject}</h2>
			<Label>{dateTime}</Label>
			<br/>
			<Input type="textarea" value={item.message} readOnly/><br/>
			{comments}
			<Form onSubmit={this.handleCommentSubmit}>
				<FormGroup>
		             <Input type="textarea" name="commentText" id="commentText" onChange={this.handleChange} value={comment.commentText || ''}/>
		             <Button color="primary" type="submit" className="float-right" style={{marginTop:5}}>Post comment</Button>
	             </FormGroup>
	       </Form>
       </div>
	}
	
}

export function getDateTime(dateTime){
	return new Date(dateTime).toLocaleDateString() + " " + new Date(dateTime).toLocaleTimeString();
}
export default withRouter(PostDetails);