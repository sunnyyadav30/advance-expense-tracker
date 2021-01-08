import React from 'react'
import './App.css';
import {Grid} from '@material-ui/core'
import Details from './components/details/Details'
import Main from './components/main/Main'
import {Provider} from './context/context'

function App() {
  return (
    <Provider>
      <div className="App">
        <Grid container spacing={0} alignItems="center" justify="center" style={{height: "100vh"}}>
          <Grid item xs={12} sm={4}>
            <Details title="Income"/>
          </Grid>
          <Grid item xs={12} sm={3} style={{margin: '0 20px'}}>
            <Main />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Details title="Expense"/>
          </Grid>
        </Grid>
      </div>
    </Provider>
  );
}

export default App;
