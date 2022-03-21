import { validated_tweet } from "../../common/common_types"

export class Tweets_Queries {
    get_tweets_unvalidated  (limit:number,eid:number, order:string) {
        return `
        SELECT * FROM unvalidated WHERE 
        (eid1 IS NULL AND eid2 IS NOT NULL AND eid2 != ${eid}) 
        OR 
        (eid2 IS NULL AND eid1 IS NOT NULL AND eid1 != ${eid}) 
        OR 
        (eid1 IS NULL AND eid2 IS NULL)
        ORDER BY ${order} LIMIT ${limit}
        `
    }

    get_tweet_unvalidated  (id:number)  {
        return `SELECT * FROM unvalidated WHERE id = ${id}`
    }

    get_tweets_validating = (eid:number, limit:number) => {
        return`
        SELECT * FROM unvalidated WHERE 
        (eid1 = ${eid} AND claim1 IS NULL AND stance1 IS NULL) 
        OR 
        (eid2 = ${eid} AND claim2 IS NULL AND stance2 IS NULL)
          

        and NOT EXISTS (SELECT * FROM skipped_tweets WHERE unvalidated.id=skipped_tweets.id )
        LIMIT ${limit}
        `
    }

    add_tweet_validating = (id:number,eid:number) =>{
        return `
        UPDATE unvalidated
        SET eid1 = COALESCE(eid1,${eid}),
            eid2 =
                CASE
                WHEN eid1  = ${eid} THEN
                  NULL
                ELSE
                  ${eid}
                END
        WHERE id = ${id}
        `
    }

    add_tweets_complete = (tweet:validated_tweet,columns:string[]) =>{
        return `
        UPDATE unvalidated SET ${columns[0]} = '${tweet.claim}', ${columns[1]} = '${tweet.stance}'
        WHERE id = ${tweet.id}
        `
    }

    unasign_tweet = (id:number,column:string) => {
        return `
        UPDATE unvalidated SET ${column} = NULL
        WHERE id = ${id}
        `
    }
}

export class User_Queries {
    login = (eid:string) => {
        return [
            `SELECT * FROM users WHERE eid = ${eid}`,
            `INSERT INTO users (eid,account_type) VALUES (${eid},"validator")`
        ]
    }

    logout = (eid:string) => {
        return [
            `
            UPDATE unvalidated SET eid1 = NULL WHERE
            eid1 = ${eid} AND claim1 IS NULL and stance1 IS NULL
            `,
            `
            UPDATE unvalidated SET eid2 = NULL WHERE
            eid2 = ${eid} AND claim2 IS NULL and stance2 IS NULL
            `
        ]
    }

    getUser = (eid:string|number)=>{
        return `
        SELECT * FROM users WHERE eid=${eid}
        `
    }

    updated_tracked_tweets = (tracked_tweets:number|string,eid:number|string) =>{
        return `
        UPDATE users SET tracked_tweets=${tracked_tweets} WHERE eid=${eid}  
        `
    }
}

