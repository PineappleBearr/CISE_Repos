import React from 'react';

const ShowBookList = () => {
    // Sample data for books
    const books = [
        { id: 1, title: 'The Great Gatsby' },
        { id: 2, title: 'To Kill a Mockingbird' },
        { id: 3, title: '1984' }
    ];

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ShowBookList;
