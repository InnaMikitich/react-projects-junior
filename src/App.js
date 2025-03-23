import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [collection, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `&category=${categoryId}` : '';
    const pageParam = page ? `&page=${page}` : ''; 
    
    fetch(`https://67daa14635c87309f52d5946.mockapi.io/collections?limit=3&${category}${pageParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((json) => {
        setCollection(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка получения данных');
      }).finally(() => setIsLoading(false));
  }, [categoryId, page]);



  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) =>
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : ''}
              key={index}>{obj.name}</li>
          )}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input" placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (<h2>Идёт загрузка...</h2>) : (Array.isArray(collection) && collection
          .filter((obj) =>
            obj.name.toLowerCase().includes(searchValue.toLowerCase())
          ).map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          )))}
      </div>
      <ul className="pagination">
       {
        [...Array(4)].map((_, i) => (
        <li 
        key={i}
        className={page === (i + 1) ? 'active' : ''}
        onClick={() => setPage(i + 1)}
        >
          {i + 1}</li>
      ))}
      </ul>
    </div>
  );
}

export default App;

