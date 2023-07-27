import { Outlet } from 'react-router-dom';
import categories from './categories.json'
import CategoriesMenu from '../../categories-menu/category-container';

const Home = () => {
    return (
        <div>
          <CategoriesMenu categories={categories}/>
          <Outlet/>
        </div>
    );
  }

export default Home;