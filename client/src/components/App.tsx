/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import '../static/css/App.css';
import Header from '../containers/Headers/Header'

import  zipObject  from 'lodash.zipobject'
import { globalProps, globalPropsDefaultObj } from '../globalProps'

const packageStatesIntoObject = (originalPackage:any,states:[string,string],stateFunction:[any,(a:any)=>void]):globalProps =>{
  //originalPackage is the object so far holding the packages
  //states is an array [stateName, setStateFunction]

  //zipObject creates an object where if you pass zipObject([1,2],['one','two']) it will return
  // {1:'one',2:'two'}
  const combinedStates = zipObject(states,stateFunction)

  //Combine the the exisiting package with the combinedStates object
  originalPackage = {...originalPackage,...combinedStates}
  return originalPackage
}

const PackageUserStates = ():globalProps =>{
  let p:any = {}
  Object.keys(globalPropsDefaultObj).forEach(key=>{
    let data = globalPropsDefaultObj[key]
    let setState = 'set' + key[0].toUpperCase() + key.slice(1)
    p = packageStatesIntoObject(p,[key,setState],useState(data))
  })
  return p
}

const App = () => {
  let allPackages = PackageUserStates()
  return (
    <div className="App">
      <Header {...allPackages}/>
    </div>
  );
}

export default App;
