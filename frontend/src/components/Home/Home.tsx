import css from './Home.module.css';
import {HeaderPage} from "../../pages";

const Home = () => {
  return (
    <div className={css.home_container}>
      <HeaderPage/>
    </div>
  );
};

export {Home};

