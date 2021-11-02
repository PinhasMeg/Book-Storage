const { ObjectId } = require('bson');
const express= require('express');
const router=express.Router();

const { PostModel}=require('../models/postModel');

//query to get all the books
router.get('/',(req,res) => {
    PostModel.find((err,docs) => {
        if(!err) res.send(docs);
        else console.log("Error to get data: "+err);
    })
});

//query to get a book from its Id
router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :"+req.params.id)
    PostModel.findById(
        req.params.id,
        (err,docs)=> {
            if(!err) res.send(docs);
            else console.log("update error"+err);} )
   


})

//query to add a book
router.post('/',(req,res)=>{
    const newRecord=new PostModel({
        author: req.body.author,
        title:req.body.title,
        edition: req.body.edition,
        pageCount:req.body.pageCount,
        date:req.body.date

    });

    newRecord.save((err,docs)=> {
        if (!err) res.send(docs);
        else console.log('Error creating new data: '+ err);
    })

})


//query to update a book from its Id
router.put("/:id",(req,res)=> {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :"+req.params.id)
    
    const updateRecord= {
        author: req.body.author,
        title:req.body.title,
        edition: req.body.edition,
        pageCount:req.body.pageCount,
        date:req.body.date

    };

    PostModel.findByIdAndUpdate(
        req.params.id,
        {$set:updateRecord},
        {new:true},
        (err,docs)=> {
            if(!err) res.send(docs);
            else console.log("update error"+err);
        }
    )
})


//query to delete abook from its Id
router.delete("/:id",(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown :"+req.params.id)
    
    PostModel.findByIdAndRemove(
        req.params.id,
        (err,docs)=>{
            if(!err) res.send(docs);
            else console.log("deleting error "+err);
        }
    )
})




//complexe query that search for all books between 1994-1998 or after 2010
router.get('/special/all',(req,res) => {
    
    PostModel.find((err,docs) => {
        if(!err) res.send(docs.filter(a=>a.date>=1994 ||a.date<=1998 ||a.date>2010));
        else console.log("Error to get data: "+err);
        
    })
});



module.exports=router;
