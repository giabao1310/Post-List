import React from "react";

interface pagination{
    postPerPage: number;
    totalPost: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: React.FC<pagination> = ({postPerPage, totalPost, paginate, currentPage}) => {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <a onClick={() => paginate(number)} href="#" className="page-link"> 
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;