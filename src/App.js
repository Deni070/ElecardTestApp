import React, { useState, useEffect } from 'react';
import './App.css';
import CardView from './components/CardView';
import TreeView from './components/TreeView';
import Pagination from './components/Pagination';

const apiUrl = 'http://contest.elecard.ru/frontend_data/catalog.json';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [deletedCards, setDeletedCards] = useState(() => {
    const storedDeletedCards = localStorage.getItem('deletedCards');
    return storedDeletedCards ? JSON.parse(storedDeletedCards) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('category');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('cards');
  const cardsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        const formattedData = jsonData.map((card, index) => ({ ...card, id: index }));
        setData(formattedData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClose = (cardId) => {
    setDeletedCards((prevDeletedCards) => [...prevDeletedCards, cardId]);
  };

  const isCardClosed = (cardId) => deletedCards.includes(cardId);

  const resetCards = () => {
    setDeletedCards([]);
  };

  const sortData = () => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      return a[sortBy] > b[sortBy] ? order : -order;
    });
    setData(sortedData);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    sortData();
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    sortData();
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = (currentPage - 1) * cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  useEffect(() => {
    localStorage.setItem('deletedCards', JSON.stringify(deletedCards));
  }, [deletedCards]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
      <div className="app">
        {loading && <p>Загрузка данных...</p>}
        <div className="view-mode-container">
          <label>
            Режим отображения:
            <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
              <option value="cards">Карточки</option>
              <option value="tree">Древовидный список</option>
            </select>
          </label>
          {viewMode === 'cards' && (
              <div className="sort-container">
                <label>
                  Сортировать по:
                  <select value={sortBy} onChange={handleSortChange}>
                    <option value="category">Категории</option>
                    <option value="timestamp">Времени</option>
                    <option value="filesize">Размеру файла</option>
                  </select>
                </label>
                <label>
                  Порядок сортировки:
                  <select value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">По возрастанию</option>
                    <option value="desc">По убыванию</option>
                  </select>
                </label>
              </div>
          )}
        </div>
        {viewMode === 'cards' ? (
            <>
              <CardView cards={currentCards} onClose={handleClose} isCardClosed={isCardClosed} />
              <Pagination
                  cardsPerPage={cardsPerPage}
                  totalCards={data.length}
                  currentPage={currentPage}
                  paginate={paginate}
              />
              <button onClick={resetCards}>Сбросить</button>
            </>
        ) : (
            <TreeView data={data} />
        )}
      </div>
  );
};

export default App;
