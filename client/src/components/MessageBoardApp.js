import React from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';
import SearchBar from './SearchBar';
import '../css/MessageBoardApp.css';

/**
 * 1. pass comments down to CommentList using props
 * 2. create a CommentItem component
 * 3. render a single CommentItem with the data
 * from the first comment (comments[0])
 * 4. Don't forget CSS
 */

class MessageBoardApp extends React.Component{
    constructor(props){
        super(props);

        // set initial state
        this.state = {
            comments: [],
        };
    }

    // lifecycle hook ran after component loaded into DOM
    componentDidMount(){
        axios.get('https://routers-and-loggers.herokuapp.com/api/comments')
            .then(response => this.setState({comments: response.data}))
            .catch(error => console.error(error));
    }

    handleDelete = id => {
        axios.delete(`https://routers-and-loggers.herokuapp.com/api/comments/${id}`)
            .then(response => this.setState({comments: response.data.comments}))
            .catch(error => console.error(error));
        // const updatedComments = this.state.comments
        //     .filter(comment => comment.id !== id);
        // this.setState({comments: updatedComments});
    }

    handleAddComment = commentText => {
        axios.post(`https://routers-and-loggers.herokuapp.com/api/comments/`, {
            text: commentText, 
        })
            .then(response => this.setState({comments: response.data.comments}))
            .catch(err => {
                if(err.response && err.response.status === 400){
                    alert('Enter Text');
                }
            });
    
    }

    handleSearch = searchText => {
        console.log(searchText);
        axios.get(`https://routers-and-loggers.herokuapp.com/api/comments/?filter=${searchText}`)
            .then(response => this.setState({comments: response.data}))
            .catch(err => console.error(err));
    
    }
    //this.setState({comments: response.data})
    //https://ssaksfithian-express-codealong.herokuapp.com/api/comments/?filter=${searchText}`

    render(){
        return(
            <div className="message-board-app">
            <SearchBar onSearch={this.handleSearch} />
            <CommentList comments={this.state.comments} 
            onDelete={this.handleDelete}/>
            <AddCommentForm onAddComment={this.handleAddComment}/>
            </div>
        )
    }
}

export default MessageBoardApp;