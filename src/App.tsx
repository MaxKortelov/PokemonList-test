import React, {FC} from 'react';

import styles from './App.module.sass';
import Loader from './Components/Loader';
import Header from './Components/Header';
import Main from './Components/Main';
import Footer from './Components/Footer';



const App : FC = () => {
  return (
      <div className={styles.wrap}>
          <Header />
          <Main />
          <Footer />
          <Loader />
      </div>
  );
}

export default App;
