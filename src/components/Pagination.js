import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
const PaginationComponent = ({
    totalPages,
    currentPage,
    handleClick,
    disabled,
}) => {
    return (
        <>
            <Pagination className="mt-4">
                {new Array(totalPages).fill().map((_, index) => (
                    <Pagination.Item
                        disabled={disabled}
                        key={index + 1}
                        onClick={() => handleClick(index + 1)}
                        active={index + 1 === currentPage}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </>
    );
};

export default PaginationComponent;
