const express = require('express');
const commentData = require('../data');
const moment = require('moment');
const shortid = require('shortid');

const router = express.Router();

// read a comment
router.get('/', (req, res) => {
    res.json(commentData);
});
  
router.get('/:id', (req, res) => {
    const myComment = commentData.find(comment => 
      comment.id === parseInt(req.params.id))
    if(myComment){
      res.json(myComment);
    }
    else{
      res.status(404).json({ msg: 'invalid ID' });
    }
})

// create a comment
router.post('/', (req, res) => {
    // creat a new comment with the text
    // timestamp
    // id use shortid
    // add it to commentData
    // return all comments (make sure the new comment is included)
    // BONUS: if request has no body text (or text 
    // is empty) send proper error code and message
    // res.json(req.body);
    // console.log(req.body);
    const commentBody = req.body.text;
    //const commentTime = `${moment()}`;
    const commentTime = moment().format();
    const commentId = shortid.generate();
    commentData.push({
        text: commentBody,
        id: commentId,
        timestamp: commentTime
    })
    res.status(201).json({
        msg: `comment successfully added`,
        comments: commentData
    });
    console.log(commentData);
})

// update a comment
router.put('/:id', (req, res) => {  
    const updatedComment = req.body.text;
    const myComment = commentData.find(index => {
        if(index.id === parseInt(req.params.id)){
            // update comment
            index.text = updatedComment;
            return index;
       }
    });

    if(myComment){
        res.json(commentData);
    }
    else{
        res.status(404).json({ msg: 'invalid ID' });
    }
})

// delete a comment
router.delete('/:id', (req, res) => {
     
     const indexToDelete = commentData.findIndex(comment => 
        comment.id === parseInt(req.params.id));
     // delete
     commentData.splice(indexToDelete, 1);
     res.json(commentData);
})

module.exports = router;