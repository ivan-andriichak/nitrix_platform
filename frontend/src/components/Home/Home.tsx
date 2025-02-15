import css from './Home.module.css';
import HeaderPage from '../../pages/HeaderPage';

const Home = () => {
  return (
    <div className={css.home_container}>
      <HeaderPage/>
    </div>
  );
};

export default Home;

