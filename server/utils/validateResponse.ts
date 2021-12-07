import Ajv from 'ajv'

export const validateResponse = (jsonObj:any,schema:any) => {
    const ajv = new Ajv({allErrors: true});
    let valid =  ajv.validate(schema, jsonObj)
    if(ajv.errors)
        return {valid:false,error:ajv.errors[0]}
    return {valid:true}
}