import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import includedRepos from "./includedRepos.json";

const allRepos = Object.values(includedRepos).reduce((a, b) => {
  return [...b, ...a];
}, []);

// @Incomplete - turn axios into its own use Axios bs

function App() {
  let [isLoading, setIsLoading] = useState(true);
  let [commitCount, setCommitCount] = useState(null);

  useEffect(() => {
    Promise.all(
      // make calls to get the total commits for each repo
      allRepos.map(repo => {
        const url =
          "https://api.github.com/repos/taq2/" + repo + "/stats/participation";

        return axios.get(url);
      })
    ).then(responses => {
      // console.log(responses);
      const count = responses.reduce((a, b) => {
        console.log(b);
        return a + b.data.all.reduce((a, b) => a + b, 0);
      }, 0);

      console.log(count);
      // ;
      setIsLoading(false);
      setCommitCount(count);
    });
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>An app to show my github things are {commitCount}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
