import React from 'react';

import styles from './App.module.sass';
import DevTools from 'mobx-react-devtools';
import Loader from './Components/Loader';
import Header from './Components/Header';
import Main from './Components/Main';



function App() {

  return (
      <div className={styles.wrap}>
          <Header />
          <Main />
          <DevTools />
          {false && <Loader />}
      </div>
  );
}

export default App;
