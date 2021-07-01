import React from 'react';

import styles from './App.module.sass';
import DevTools from 'mobx-react-devtools';
import Loader from './Components/Loader';
import Header from './Components/Header';



function App() {
  return (
      <div className={styles.wrap}>
          <DevTools />
          {false && <Loader />}
          <Header />
      </div>
  );
}

export default App;
