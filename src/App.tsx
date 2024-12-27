import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Search from "./components/Search";
import data from "./data.json";


const App = () =>  {
  const loadGithubUsers = (key: string) => {
    return fetch(`https://api.github.com/search/users?q=${key}`)
      .then((res) => res.json())
      .then(({ items = [] }) => {
        return (items as Array<any>)
          .map((item) => ({ id: item?.id, name: item?.login, img: item?.avatar_url }))
      });
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div className="header">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Search</h1>
        <Search
          options={data}
          label={"Default saggestion list"}
          onChange={console.warn}
        />
      </div>
      <div className="card">
        <div className="header">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Search</h1>
        <Search
          label={"Async list (github as an example)"}
          asyncAction={loadGithubUsers}
          debounceTime={400}
          onChange={console.warn}
        />
      </div>

    </div>
  )
}

export default App
