import React from 'react';
import CommentItem from './CommentItem';
import '../css/CommentList.css';

export default class CommentList extends React.Component{
    render(){
        const {comments, onDelete} = this.props
        return(
            <div className="message-board-comment-list">
                {comments.map(comment => (
                    <CommentItem key={comment.id} comment={comment}
                    onDeleteMe={() => onDelete(comment.id)}/>
                ))}
            </div>
        )
    }
}