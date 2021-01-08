import React, { useRef, useEffect } from 'react'
import './App.css';
import {Grid} from '@material-ui/core'
import Details from './components/details/Details'
import Main from './components/main/Main'
import {Provider} from './context/context'
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui'
import useStyles from './appStyles'
import { SpeechState, useSpeechContext } from '@speechly/react-client'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  const classes = useStyles()
  const { speechState } = useSpeechContext()
  const main = useRef(null)
  const executeScroll = ()=> main.current.scrollIntoView();
  useEffect(()=>{
    if(speechState === SpeechState.Recording){
      executeScroll()
    }
  },[speechState])
  return (
    <Provider>
      <Router basename={'/advanced-expense-tracker'}>
        <Switch>
          <Route path="/">
            <div className="App">
              <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height: "100vh"}}>
                <Grid item xs={12} sm={4} className={classes.mobile}>
                  <Details title="Income"/>
                </Grid>
                <Grid ref={main} item xs={12} sm={3} className={classes.main}>
                  <Main />
                </Grid>
                <Grid item xs={12} sm={4} className={classes.desktop}>
                  <Details title="Income"/>
                </Grid>
                <Grid item xs={12} sm={4} className={classes.last}>
                  <Details title="Expense"/>
                </Grid>
              </Grid>
              <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
              </PushToTalkButtonContainer>
            </div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
