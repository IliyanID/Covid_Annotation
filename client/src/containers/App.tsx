/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dropzone-uploader/dist/styles.css'
import 'antd/dist/antd.css';
import 'rc-slider/assets/index.css';
import '../static/css/App.css';
import Header from './Margins/Margins'
import TweetContainer from '../components/Tweets/TweetContainer';
import SettingsContainer from '../components/Settings/SettingsContainer'
import StatisticsContainer from '../components/Statistics/StatisticsContainer'
import {globalPropsDefaultObj } from '../common_types'
import { packageStatesIntoObject } from '../utils/packageStatesIntoObject'
import LoginModal from '../components/Modals/Login_Modal';
import { API_USER } from '../utils/API/APIMain';

export enum Pages  {
  validate,
  settings ,
  statistics
}

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

const getCurrentPage = (allPackages:any) =>{
  if(allPackages.currentPage === Pages.validate)
    return  <TweetContainer {...allPackages}/>
  else if(allPackages.currentPage === Pages.settings)
    return <SettingsContainer {...allPackages}/>
  else if(allPackages.currentPage === Pages.statistics)
    return <StatisticsContainer {...allPackages}/>
}

const App = (props:any) => {

  let allPackages = PackageUserStates(props)
  window.onbeforeunload =  function() {
    new API_USER(allPackages.showMessage).LOGOUT(allPackages.eid)
}

  return <div className="App">
      <LoginModal {...allPackages}/>
      <Header {...allPackages}/>
      {getCurrentPage(allPackages)}
      

    </div>
  
}

export default App;
