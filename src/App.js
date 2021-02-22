
import React, { Suspense, useContext } from "react";
import AppContext from "./context/app-context";
import { AppContextProvider } from "./context/app-context";
import { LanguageContextProvider } from "./context/language-context";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Main from "./components/Main";

//console.log(Test1());
/* class App extends Comment {
  constructor(props) {
    super(props);

    this.state = {
      auth: true
    }

  }

  render() {
    return (
      <Suspense fallback={<div></div>}>
        <AppContextProvider>
          <div className="App">
            <LoginForm
            show={this.state.auth === false}
            onLogin={(username, password) => this.handleLogin(username, password)}
          />   
            <Header />
            <Main />

          </div>
        </AppContextProvider>
      </Suspense>
    )
  }
}
 */


export default function App() {  
  const { showloading } = useContext(AppContext);
  console.log("showloading=",showloading);
  return (

    <Suspense fallback={<div></div>}>
      <AppContextProvider>
        <LanguageContextProvider>
          <div className="App">
            <Loading />
            <Header />
            <Main />           
          </div>
        </LanguageContextProvider>
      </AppContextProvider>
    </Suspense>
  );
}
