export const SchemaCheck = (response:Object,schema:Object) =>{
    var Validator = require('jsonschema').Validator;
    var v = new Validator();
    return v.validate(response, schema)
}
export default SchemaCheck