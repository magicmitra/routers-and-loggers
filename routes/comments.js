const express = require('express');
const commentData = require('../data');
const moment = require('moment');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

// create the db if it doesnt exist and seed it 
// with data
const adapter = new FileSync('db.json',  {
    defaultValue: {comments: commentData},
});

const db = lowdb(adapter);

const router = express.Router();

// read a comment
router.get('/', (req, res) => {
    const comments = db.get('comments')
        .value();
    res.json(comments);
});
  
router.get('/:id', (req, res) => {
    const myComment = db.get('comments')
        .find({id: req.params.id})
        .value();
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

    db.get('comments')
        .push(commentData)
        .write();
    res.status(201).json({
        msg: `comment successfully added`,
        comments: db.get('comments').value()
    });
    console.log(commentData);
})

// update a comment
router.put('/:id', (req, res) => {  
    if(!req.body.text){
        return res.status(400).json({msg: 'invalid syntax, provide text'});
    }

    if(
        !db 
            .get('comments')
            .find({id: req.params.id})
            .value()
    ){
        return res.status(404).json({msg: 'invalid id'});
    }

    db.get('comments')
        .find({id: req.params.id})
        .assign({text: req.body.text})
        .write();

    return res.json(db.get('comments').value());
})

// delete a comment
router.delete('/:id', (req, res) => {
    if(
        !db 
            .get('comments')
            .find({id: req.params.id})
            .value()
    ){
        return res.status(404).json({msg: 'invalid id'});
    }
    
    db.get('comments')
        .remove({id: req.params.id})
        .write();

    //  const indexToDelete = commentData.findIndex(comment => 
    //     comment.id === parseInt(req.params.id));
    //  // delete
    //  commentData.splice(indexToDelete, 1);
    //  res.json(commentData);

     res.status(200).json({msg: 'successfully deleted', comments: db.get('comments').value()});
})

module.exports = router;