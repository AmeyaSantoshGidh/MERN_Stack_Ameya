// import app from './server.js';
import mongodb, { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { throws } from 'assert';
// import MoviesDAO from './moviesDAO.js';

// Node js has access to file system (from server side).

const MongoClient = import("mongodb").MongoClient;
const dbUrl = "mongodb://0.0.0.0:27017";
const dbName = " movie_time_db";   
const dbCollection = "reviews";
const PORT = 5000;
let db,colection;
let reviews;
let c = 0;


export default class ReviewsDAO{
    static async injectDB(conn){
        if(reviews){
            return;
        }try{
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        }catch(e){
            console.log(`Unable to establish connection handle in reviewsDA: ${e}`);
        }
    }
 
    

static async addReview(movieId,user,review,date){
try{
    const reviewDoc ={
        name:user.name,
        user_id:user._id,
        date:date,
        review: review,
        movie_id: ObjectId(movieId)
    }
    return await reviews.insertOne(reviewDoc);
    }catch(e){
        console.error(`Unable to post review: ${e}`);
        return {error:e};
    }
}
static async updateReview(reviewId,userId, review,date){
 
    MongoClient.connect(dbUrl,function(err,client){
        if(err){
            console.log("Failed to make a connection",err);
        }
    
        else{
            console.log("Connected successfully to db server");
            db = client.db(dbName);
            collection = db.collection(dbCollection);
            let editItem = collection.find({reviewId:reviewId}).toArray(function(err,docs){
                if(err){
                    response.writeHead(500);
                    response.end(err);
                }
                else{
                    response.writeHead(200,{"Content-type":"application/JSON"});
                    response.end(JSON.stringify(docs))
                    c = 1;
                }
    
            });
        if(c === 1){    
        let query_val = editItem.updateOne({"review": review }, {$set:{"review":review,"date":date}});
            if(query_val.modifiedCount <= 0){
                throw new error();
            }
    }              
        }
    });
    
    
}

static async deleteReview(reviewId,userId){
    MongoClient.connect(dbUrl,function(err,client){
        if(err){
            console.log("Failed to make a connection",err);
        }
    
        else{
            console.log("Connected successfully to db server");
            db = client.db(dbName);
            collection = db.collection(dbCollection);
            let editItem = collection.find({reviewId:reviewId}).toArray(function(err,docs){
                if(err){
                    response.writeHead(500);
                    response.end(err);
                }
                else{
                    response.writeHead(200,{"Content-type":"application/JSON"});
                    response.end(JSON.stringify(docs))
                    c = 1;
                }
    
            });
        if(c === 1){    

        let query_val = editItem.deleteOne({"userId":userId});
    }              
   }
});
    
}
}