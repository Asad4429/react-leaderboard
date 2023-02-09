import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './layouts/Header';
import Schedule from './pages/Schedule';
import Leaderboard from './pages/Leaderboard';
import ErrorPage from "./pages/ErrorPage";
import Footer from './layouts/Footer';
import LeagueService from './services/LeagueService';
import { SCHEDULE, LEADERBOARD } from "./constant";
import style from "./App.module.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [leagueService, setLeagueService] = useState(new LeagueService());

  useEffect(() => {
    (async () => {
      try {
        await leagueService.fetchData();
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setLeagueService(leagueService);
        setIsLoading(false);
      }
    })();
  });

  return (
    <React.Fragment>
      <Header />
      {isLoading ?
        <p className={style.msg}>Loading...</p>
        :
        isError ?
          <p className={style.msg}>Oops Something went wrong!</p>
          :
          <Switch>
            <Route exact path='/' render={props => <Schedule {...props} matches={leagueService ? leagueService.getMatches() : []} />} />
            <Route exact path={`/${SCHEDULE}`} render={props => <Schedule {...props} matches={leagueService ? leagueService.getMatches() : []} />} />
            <Route exact path={`/${LEADERBOARD}`} render={props => <Leaderboard {...props} leaderboard={leagueService.getLeaderboard()} />} />
            <Route render={() => <ErrorPage />} />
          </Switch>
      }
      <Footer />
    </React.Fragment>
  );
}

export default App;
