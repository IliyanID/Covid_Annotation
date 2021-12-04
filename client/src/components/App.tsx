/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';
import Header from '../containers/Margins/Margins'
import TweetContainer from './Tweets/TweetContainer';
import {globalPropsDefaultObj } from '../propTypes'
import { packageStatesIntoObject } from '../utils/packageStatesIntoObject'

const PackageUserStates = (props:any)=>{
  let p:any = {}
  Object.keys(globalPropsDefaultObj).forEach(key=>{
    let data = globalPropsDefaultObj[key]
    let setState = 'set' + key[0].toUpperCase() + key.slice(1)
    p = packageStatesIntoObject(p,[key,setState],useState(data))
    p = {...p,...props}
  })
  return p
}

const App = (props:any) => {
  let allPackages = PackageUserStates(props)
  return (
    <div className="App">
      <Header {...allPackages}/>
      <TweetContainer {...allPackages} />
    </div>
  );
}

export default App;
