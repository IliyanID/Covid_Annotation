import express, {Request, Response } from 'express';

const PORT = process.env.PORT || 3001;

const app = express()

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/get_tweets/:eid", (req:Request, res:Response) => {
  let tempObj = [
    {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something. This is the priority',
        priority:false,
        id:0
    },
    {
        tweet_content:'Tdfdadssssssssssssssssffffffffhis is the tweet that they are trying to figure out now and the context might be something or it might be something',
        priority:false,
        id:1
    },
    {
        tweet_content:'This is HIGH PRIORITYthdasfffffffffffffffffe tweet that they are trying to figure out now and the context might be something or it might be something',
        priority:true,
        id:2
    },
    {
        tweet_content:'This is the tHIGH PRIROTITYweet that they are trying to figure out now and the context might be something or it might be something',
        priority:true,
        id:3
    }
    , {
        tweet_content:'This is the tweet that they are trying to figure out now and the context might be something or it might be something',
        priority:false,
        id:4
    }
    , {
        tweet_content:'This is theffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff tweet that they are trying to figure out now and the context might be something or it might be something',
        priority:false,
        id:5
    }

]
  const eid = req.params.eid;
  const limit:any = req.query.limit
  console.log(req)
  res.json(tempObj.splice(0,limit));
});