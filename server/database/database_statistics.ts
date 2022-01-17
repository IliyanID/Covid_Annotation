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

            case 'null':
                return 'IS NULL AND'
            break;

            case 'not-null':
                return 'IS NOT NULL AND'
            break;
        }
    }

    parseFilter = (filter:ICondition) =>{
        let queryString = ''
        if(filter.value === '')
            filter.value = '\' = \'';
        switch(filter.label){
            case "Tweet ID":
                queryString += ` id ${this.parseOperator(filter.operator)} '${filter.value}'`
            break;

            case "Tweet Content":
                queryString += ` tweet_content ${this.parseOperator(filter.operator)} '${filter.value}'`
            break;

            case "Tweet Created":
                queryString += ` tweet_created ${this.parseOperator(filter.operator)} '${filter.value}'`
            break;

            case "Annotators EID":
                queryString += ` (eid1 ${this.parseOperator(filter.operator)} '${filter.value}' OR eid2 ${this.parseOperator(filter.operator)} '${filter.value}')`
            break;

            case "Claim":
                queryString += ` (claim1 ${this.parseOperator(filter.operator)} '${filter.value}' OR claim2 ${this.parseOperator(filter.operator)} '${filter.value}')`
            break;

            case "Stance":
                queryString += ` (stance1 ${this.parseOperator(filter.operator)} '${filter.value}' OR stance2 ${this.parseOperator(filter.operator)} '${filter.value}')`
            break;

            case "Validated Time":
                queryString += ` (validated_time1 ${this.parseOperator(filter.operator)} '${filter.value}' OR validated_time2 ${this.parseOperator(filter.operator)} '${filter.value}')`
            break;
        }
        return queryString;
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

    get_annotated_tweets = async (filters:ICondition[],limit:number) =>{
        let queryString = 'SELECT * FROM validated '

        if(filters.length > 0)
            queryString += ' WHERE '
        filters.map((filter,index) =>{
            queryString += this.parseFilter(filter)
            if(index !== filters.length - 1)
                queryString += ' AND '
        })

        queryString += ` ORDER BY validated_time2 DESC LIMIT ${limit} `
        let result = await this.queryDatabase(queryString)
        return result;
    }

    get_incomplete_tweets = async (filters:ICondition[],limit:number) =>{
        let queryString = 'SELECT * FROM unvalidated WHERE '
        filters.map((filter,index) =>{
            queryString += this.parseFilter(filter)
            queryString += ' AND '
        })

        queryString += `(stance1 is null OR stance2 is NULL) ORDER BY id ASC LIMIT ${limit} `
        let result = await this.queryDatabase(queryString)
        return result;
    }

    get_skipped_tweets = async (filters:ICondition[],limit:number) =>{
        let queryString = 'SELECT * FROM skipped_tweets '

        if(filters.length > 0)
            queryString += ' WHERE '
        filters.map((filter,index) =>{
            queryString += this.parseFilter(filter)
            if(index !== filters.length - 1)
                queryString += ' AND '
        })

        queryString += ` ORDER BY id DESC LIMIT ${limit} `
        let result = await this.queryDatabase(queryString)
        return result;
    }
}