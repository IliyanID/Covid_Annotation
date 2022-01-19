import { unvalidated_tweet } from "../../common/common_types"

export class Export_Data_Queries {
    export_data = () =>{
        return `SELECT * FROM validated`
    }
}

export class Import_Data_Queries {
    import_data = (tweets:unvalidated_tweet[]) => {
        let result = `INSERT INTO unvalidated(tweet_content,tweet_created) VALUES `
        result += tweets.map((tweet)=>{
            return` ('${tweet.tweet_content}','${tweet.tweet_created}') `
        })
        
        result += ` ON DUPLICATE KEY UPDATE tweet_content=tweet_content;`
        return result
    }
}

export class Manage_Access_Queries {
    get_users = (parent_EID:string) =>{
        return `SELECT * FROM users WHERE parent = ${parent_EID}`
    }

    add_user = (new_EID:string,parent_EID:string,privlidge:string) => {
        return [
            `INSERT IGNORE INTO users (eid,account_type,parent) values (${new_EID},"${privlidge}",${parent_EID})`,
            `UPDATE users SET account_type = "${privlidge}",parent=${parent_EID} where eid = ${new_EID}`
        ]
    }

    remove_user = (deleted_EID:string,parent_EID:string) => {
        return `DELETE FROM users WHERE eid = ${deleted_EID} AND parent = ${parent_EID}`
    }

    get_admins = () => {
        return `SELECT * FROM users WHERE account_type = 'admin'`
    }

    get_all_users = () => {
        return `SELECT * FROM users`
    }
}