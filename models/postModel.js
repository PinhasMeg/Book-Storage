const mongoose=require("mongoose");

const PostModel = mongoose.model(
    "node-api",
    {
        author:{
            type: String,
            required: true
        },
        title: {
            type:String,
            required:true
        },
        edition: {
            type:String,
            required:true
        },

        pageCount: {
            type: Number,
            required:true
        },
        date: {
            type:Date,
            default:Date.now
        }


    },
    "posts"
);

module.exports={PostModel};
