/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/css/App.css';
import Header from '../containers/Margins/Margins'
import TweetContainer from './Tweets/TweetContainer';
import {globalPropsDefaultObj } from '../common_types'
import { packageStatesIntoObject } from '../utils/packageStatesIntoObject'
import Login_Modal from './Modals/Login_Modal';
import { API_LOGOUT } from '../utils/API';

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
  window.onbeforeunload =  function() {
   
      console.log('fired')
      API_LOGOUT({eid:allPackages.eid})
      //for(let i = 0 ;i < 9999999999999999999;i++){
        //console.log(i)
      //}
    
}

  return (
    <div className="App">
      <Login_Modal {...allPackages}/>
      <Header {...allPackages}/>
      <TweetContainer {...allPackages} />
    </div>
  );
}

export default App;
