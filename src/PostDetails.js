import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Label, Input } from 'reactstrap';

class PostDetails extends Component{
	
	constructor(props){
		super(props);
		this.state = {
				item:{
					creationDate:'',
					message: ''
				}, 
				isLoading:true}
	}	
	
	async componentDidMount(){
		if(this.props.match.params.id !== 'new'){
			const post = await(await fetch(`/forum/post/${this.props.match.params.id}`)).json();
			this.setState({item:post, isLoading:false});
		}
	}
	
	render(){
		const {item, isLoading} = this.state;
		const dateTime = new Date(item.creationDate).toLocaleDateString() + " " + new Date(item.creationDate).toLocaleTimeString();
		if(isLoading){
			return <p> Loading... </p>
		}
		
		const comments = item.comments.map(comment=>{
			return <div>{comment.commentText}</div>
		});
		
		return <div className="container">
			<h2>{item.subject}</h2>
			<Label for="creationDate">Creation date</Label>
			<Input type="text" value={dateTime}/>
			<br/>
			<Input type="textarea" value={item.message}/><br/>
			{comments}
		</div>
	}
	
}

export default withRouter(PostDetails);