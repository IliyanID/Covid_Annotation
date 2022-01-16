import  zipObject  from 'lodash.zipobject'

export const packageStatesIntoObject = (originalPackage:any,states:[string,string],stateFunction:[any,(a:any)=>void]):any =>{
    //originalPackage is the object so far holding the packages
    //states is an array [stateName, setStateFunction]
  
    //zipObject creates an object where if you pass zipObject([1,2],['one','two']) it will return
    // {1:'one',2:'two'}
    const combinedStates = zipObject(states,stateFunction)
  
    //Combine the the exisiting package with the combinedStates object
    originalPackage = {...originalPackage,...combinedStates}
    return originalPackage
  }

  export default packageStatesIntoObject