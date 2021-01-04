import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "./Context/context"
import { SpeechProvider} from "@speechly/react-client";

const speechlyID=process.env.REACT_APP_SPEECHLY_API

ReactDOM.render(
  <SpeechProvider appId={speechlyID} language="en-US">
      <Provider>
    <App />
    </Provider>
    </SpeechProvider>

  ,
  document.getElementById('root')
);

