import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider, useSnackbar, VariantType } from 'notistack';
export const HookCaller = () => {
  const { enqueueSnackbar } = useSnackbar();

  async function showMessage(message:string, variant:VariantType = "info") {
      enqueueSnackbar(message, { variant: variant })
  }

  return <App showMessage={showMessage} />;
};

ReactDOM.render(
  <React.StrictMode>
     
        <SnackbarProvider maxSnack={3} preventDuplicate>
            <HookCaller />
        </SnackbarProvider>
    
   
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
