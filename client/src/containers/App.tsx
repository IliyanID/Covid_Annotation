/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropzone-uploader/dist/styles.css'
import '../static/css/App.css';
import Header from './Margins/Margins'
import TweetContainer from '../components/Tweets/TweetContainer';
import SettingsContainer from '../components/Settings/SettingsContainer'
import {globalPropsDefaultObj } from '../common_types'
import { packageStatesIntoObject } from '../utils/packageStatesIntoObject'
import Login_Modal from '../components/Modals/Login_Modal';
import { API_LOGOUT } from '../utils/API';

const PackageUserStates = (props:any)=>{
  let p:any = {}
  Object.keys(globalPropsDefaultObj).forEach(key=>{
    let data = globalPropsDefaultObj[key]
    let setState = 'set' + key[0].toUpperCase() + key.slice(1)
    p = packageStatesIntoObject(p,[key,setState],useState(data))
    p = {...p,...props}
  })
  p = packageStatesIntoObject(p,['currentPage','setCurrentPage'],useState(Pages.validate))
  return p
}

export enum Pages  {
  validate,
  settings ,
  statistics
}

const getCurrentPage = (allPackages:any) =>{
  if(allPackages.currentPage === Pages.validate)
    return  <TweetContainer {...allPackages}/>
  else if(allPackages.currentPage === Pages.settings)
    return <SettingsContainer {...allPackages}/>
}

const App = (props:any) => {

  let allPackages = PackageUserStates(props)
  window.onbeforeunload =  function() {
      console.log('fired')
      API_LOGOUT({eid:allPackages.eid})
}

  return <div className="App">
      <Login_Modal {...allPackages}/>
      <Header {...allPackages}/>
      {getCurrentPage(allPackages)}
      

    </div>
  
}

export default App;
