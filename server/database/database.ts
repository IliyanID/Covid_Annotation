import { connect_database } from './connect_database'
export class database {
    connection
    constructor(enviroment:'dev'|'prod'){
        if(enviroment == 'dev')
            this.connection = connect_database('')
        else    
            this.connection = connect_database('')
    }

}