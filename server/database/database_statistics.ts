import { database } from "./database"
import { ICondition } from 'react-filter-easy'
import { query } from "express"


export class database_statistics extends database {
    constructor(){
        super('dev')
    }

    parseOperator = (operator:string)=>{
        switch(operator){
            case "equal":
                return '='
            break;

            case "more":
                return '>'
            break;
            
            case 'less':
                return '<'
            break;

            case 'contain':
                return 'LIKE'
            break;
        }
    }

    get_active_tweets = async() =>{
        let queryString = `
            SELECT * from unvalidated WHERE (eid1 IS NOT NULL AND claim1 is NULL) OR (eid2 IS NOT NULL AND claim2 is NULL) ORDER BY RAND()
        `
        let result = this.queryDatabase(queryString);
        return result;
    }

    get_loggegin_users = async() =>{
        let queryString = `
            SELECT eid1,eid2 from unvalidated WHERE (eid1 IS NOT NULL AND claim1 IS NULL) OR (eid2 IS NOT NULL AND claim2 IS NULL)
        `
        let result = this.queryDatabase(queryString);
        return result;
    }

    get_annotated_tweets = async (filter:ICondition[],limit:number) =>{
       // this.queryDatabase('')

        let queryString = 'SELECT * FROM validated '

        if(filter.length > 0)
            queryString += ' WHERE '
        filter.map((obj,index) =>{
            switch(obj.label){
                case "Tweet ID":
                    queryString += ` id ${this.parseOperator(obj.operator)} '${obj.value}'`
                break;

                case "Tweet Content":
                    queryString += ` tweet_content ${this.parseOperator(obj.operator)} '${obj.value}'`
                break;

                case "Tweet Created":
                    queryString += ` tweet_created ${this.parseOperator(obj.operator)} '${obj.value}'`
                break;

                case "Annotators EID":
                    queryString += ` (eid1 ${this.parseOperator(obj.operator)} '${obj.value}' OR eid2 ${this.parseOperator(obj.operator)} '${obj.value}')`
                break;

                case "Claim":
                    queryString += ` (claim1 ${this.parseOperator(obj.operator)} '${obj.value}' OR claim2 ${this.parseOperator(obj.operator)} '${obj.value}')`
                break;

                case "Stance":
                    queryString += ` (stance1 ${this.parseOperator(obj.operator)} '${obj.value}' OR stance2 ${this.parseOperator(obj.operator)} '${obj.value}')`
                break;

                case "Validated Time":
                    queryString += ` (validated_time1 ${this.parseOperator(obj.operator)} '${obj.value}' OR validated_time2 ${this.parseOperator(obj.operator)} '${obj.value}')`
                break;
            }
            if(index !== filter.length - 1)
                queryString += ' AND '
        })

        queryString += ` ORDER BY validated_time2 DESC LIMIT ${limit} `
        let result = await this.queryDatabase(queryString)
        return result;
    }
}