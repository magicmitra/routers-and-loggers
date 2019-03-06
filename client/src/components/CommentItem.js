import React from 'react';
import '../css/CommentItem.css';

export default class CommentItem extends React.Component{
    render(){
        const {comment, onDeleteMe} = this.props
        return(
            // <div>
            //     <div className="message-board-comment-item">{this.props.comment[0].text}</div>
            //     <div className="message-board-comment-item">{this.props.comment[1].text}</div>
            //     <div className="message-board-comment-item">{this.props.comment[2].text}</div>
            //     <div className="message-board-comment-item">{this.props.comment[3].text}</div>
            //     <div className="message-board-comment-item">{this.props.comment[4].text}</div>
            // </div>
            <div className="message-board-comment-item">
                <p>{comment.text}</p>
                <button type="button" className="delete-button" onClick={onDeleteMe}>
                X</button>
            </div>
        )
    }
}