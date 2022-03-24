import { ICondition } from "react-filter-easy";

export class Dashboard_Queries {
    get_active_tweets = () =>{
        return `SELECT * from unvalidated WHERE (eid1 IS NOT NULL AND claim1 is NULL) OR (eid2 IS NOT NULL AND claim2 is NULL) ORDER BY RAND()`
    }

    get_loggedin_users = () => {
        return `SELECT eid1,eid2 from unvalidated WHERE (eid1 IS NOT NULL AND claim1 IS NULL) OR (eid2 IS NOT NULL AND claim2 IS NULL)`
    }
}

export class Annotated_Tweets_Queries {
    get_tweets = (filters:ICondition[],limit:number) => {
        let queryString = 'SELECT * FROM validated '

        if(filters.length > 0)
            queryString += ' WHERE '
        filters.map((filter,index) =>{
            queryString += parseFilter(filter)
            if(index !== filters.length - 1)
                queryString += ' AND '
        })

        queryString += ` ORDER BY validated_time2 DESC LIMIT ${limit} `  
        return queryString;    
    }
}

export class Incomplete_Tweets_Queries {
    get_tweets = (filters:ICondition[],limit:number) => {
        let queryString = 'SELECT * FROM unvalidated WHERE '
        filters.map((filter) =>{
            queryString += parseFilter(filter)
            queryString += ' AND '
        })

        queryString += `(stance1 is null OR stance2 is NULL) ORDER BY id ASC LIMIT ${limit} `
        console.log(queryString)
        return queryString
    }
}

export class Skipped_Tweets_Queries {
    get_tweets = (filters:ICondition[],limit:number) => {
        let queryString = 'SELECT * FROM skipped_tweets '

        if(filters.length > 0)
            queryString += ' WHERE '
        filters.map((filter,index) =>{
            queryString += parseFilter(filter)
            if(index !== filters.length - 1)
                queryString += ' AND '
        })

        queryString += ` ORDER BY id DESC LIMIT ${limit} `
        return queryString
    }

    delete_tweet = (id:string|number) => {
        return `DELETE FROM skipped_tweets WHERE id = ${id}`
    }
}

export class User_Tweets_Goals{

    get_users = (filters:ICondition[]) =>{
        let query = 'SELECT * FROM users WHERE '
        for(let i = 0; i < filters.length;i++){
            let filter = filters[i]
            query += parseFilter(filter) + 'AND'
        }

        //Remove last AND
        query = query.substring(0,query.length - 3)
        return query;
    }

    update_users = (user:any)=>{
        return  `UPDATE users SET tracked_tweets=${user.tweets_completed}, tracked_tweets_goal=${user.tweets_completed_goal} WHERE eid=${user.eid} `

    }

    clear_goals = (users:any)=>{
        return `
        
        `
    }
}

const parseOperator = (operator:string)=>{
    switch(operator){
        case "equal":
            return '='

        case "more":
            return '>'
        
        case 'less':
            return '<'

        case 'contain':
            return 'LIKE'

        case 'null':
            return 'IS NULL AND'

        case 'not-null':
            return 'IS NOT NULL AND'
    }
}
const parseFilter = (filter:ICondition) =>{
    if(filter.value === '')
        filter.value = '\' = \'';
    switch(filter.label){
        case "Tweet ID":
            return ` id ${parseOperator(filter.operator)} '${filter.value}'`
        case "Original ID":
            return ` original_id ${parseOperator(filter.operator)} '${filter.value}'`
        case "Tweet Content":
            return ` tweet_content ${parseOperator(filter.operator)} '${filter.value}'`

        case "Tweet Created":
            return ` tweet_created ${parseOperator(filter.operator)} '${filter.value}'`

        case "Annotators EID":
            return ` (eid1 ${parseOperator(filter.operator)} '${filter.value}' OR eid2 ${parseOperator(filter.operator)} '${filter.value}')`

        case "Claim":
            return ` (claim1 ${parseOperator(filter.operator)} '${filter.value}' OR claim2 ${parseOperator(filter.operator)} '${filter.value}')`

        case "Stance":
            return ` (stance1 ${parseOperator(filter.operator)} '${filter.value}' OR stance2 ${parseOperator(filter.operator)} '${filter.value}')`

        case "Validated Time":
            return ` (validated_time1 ${parseOperator(filter.operator)} '${filter.value}' OR validated_time2 ${parseOperator(filter.operator)} '${filter.value}')`
        
        case "User EID":
            return ` eid ${parseOperator(filter.operator)} '${filter.value}'`
        
        case "Tweets Completed":
            return ` tracked_tweets ${parseOperator(filter.operator)} '${filter.value}'`

        case "Tweet Completion Goal":
            return ` tracked_tweets_goal ${parseOperator(filter.operator)} '${filter.value}'`
    }
}