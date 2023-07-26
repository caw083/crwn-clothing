import './category.styles.scss'
import CategoryContainer from './components/categories-container/category-container';
import categories from './categories.json'

function App() {
  return (
    <div className="App">
      <CategoryContainer categories={categories}/>
    </div>
    
  );
}

export default App;
