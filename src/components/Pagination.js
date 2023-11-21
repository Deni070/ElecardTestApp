import TreeView from "./TreeView";

const Pagination = ({ cardsPerPage, totalCards, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map((number) => (
                <li key={number} className={currentPage === number ? 'active' : ''}>
                    <button onClick={() => paginate(number)}>{number}</button>
                </li>
            ))}
        </ul>
    );
};

export default Pagination;