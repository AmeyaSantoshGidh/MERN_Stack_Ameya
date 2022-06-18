// import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
// import MoviesDAO from './moviesDAO.js';

let reviews;
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
static async updateReview(reviewId,userId, review,date){}

static async deleteReview(reviewId,userId){

}
}
// async function main() {
//     dotenv.config();

//     const client = new mongodb.MongoClient(
//         process.env.MOVIEREVIEWS_DB_URI
//     )
//     const port = process.env.PORT || 8000;

//     try {
//         // Connect to MongoDB server
//         await client.connect();
//         await MoviesDAO.injectDB(client);

//         app.listen(port, () => {
//             console.log("server is running on port :" + port);
//         })
//     } catch (e) {
//         console.error(e);
//         process.exit(1);
//     }
// }

// main().catch(console.error);