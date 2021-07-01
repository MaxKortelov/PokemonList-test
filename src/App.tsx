import React, {FC} from 'react';

import styles from './App.module.sass';
import DevTools from 'mobx-react-devtools';
import Loader from './Components/Loader';
import Header from './Components/Header';
import Main from './Components/Main';



const App : FC = () => {

  return (
      <div className={styles.wrap}>
          <Header />
          <Main />
          <Loader />
          <DevTools />
      </div>
  );
}

export default App;
