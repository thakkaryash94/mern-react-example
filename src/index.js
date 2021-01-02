import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, theme, CSSReset, ColorModeScript } from '@chakra-ui/react'
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import client from './client'

const breakpoints = ["360px", "768px", "1024px", "1440px"]
breakpoints.sm = breakpoints[0]
breakpoints.md = breakpoints[1]
breakpoints.lg = breakpoints[2]
breakpoints.xl = breakpoints[3]

theme.breakpoints = breakpoints


ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ApolloProvider client={client}>
        <CookiesProvider>
          <Router>
            <App />
          </Router>
        </CookiesProvider>
      </ApolloProvider>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
