import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
      try{
        const movieId = req.body.movie_id;
        const review = req.body.review;
        const userInfo = {
          name:req.body.name,
          _id:req.body.user_id
        }
        const date = new Date();
        const reviewResponse = await ReviewsDAO.addReview(
          movieId,
          userInfo,
          review,
          date
        );
        // res.json({status:"success"});
        var {error} = reviewResponse;
        console.log("Error is "+error);
        if(error){
          res.status(500).json({error:"Unable to post review."});
        }
        else{
          res.json({status:"success"});
        }
      }catch(e){
        res.status(500).json({error:e.message});
      }
    }
  
    static async apiUpdateReview(req, res, next) {
        try{
          const reviewId = req.body.reviewId;
          const userId = req.body.userId;
          const review = req.body.review;
          const date = new Date();
          const reviewResponse = await ReviewsDAO.updateReview(
            reviewId,
            userId, 
            review,
            date
          );
          res.json({status:"success"});
          var {error} = reviewResponse;
          console.log("Error is "+error);
          if(error){
            res.status(500).json({error:"Unable to post review."});
          }
          else{
            res.json({status:"success"});
          }
        }catch(e){
          res.status(500).json({error:e.message});
        }
      }
  
    static async apiDeleteReview(req, res, next) {
      //
      try{
        const reviewId = req.body.reviewId;
        const userId = req.body.userId;
        const reviewResponse = await ReviewsDAO.deleteReview(
          reviewId,
          userId, 
        );
        res.json({status:"success"});
        var {error} = reviewResponse;
        console.log("Error is "+error);
        if(error){
          res.status(500).json({error:"Unable to post review."});
        }
        else{
          res.json({status:"success"});
        }
      }catch(e){
        res.status(500).json({error:e.message});
      }
      
    }
  }