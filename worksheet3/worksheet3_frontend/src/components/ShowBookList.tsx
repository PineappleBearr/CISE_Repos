import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BookCard from './BookCard';
import { Book } from './Books';  // Ensure this type definition is accurate and imported correctly.

function ShowBookList() {
  const [books, setBooks] = useState<Book[]>([]); // Corrected the TypeScript type for state initialization.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`) // Using environment variable for API URL.
      .then((res) => {
        if (!res.ok) { // Check if response is not OK then throw an error.
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((books) => {
        setBooks(books);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error from ShowBookList:', err);
        setError('Failed to fetch books');
        setLoading(false);
      });
  }, []);

  // Render logic to handle loading and error states.
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const bookList = books.length === 0
    ? <div>There is no book record!</div>
    : books.map((book, k) => <BookCard book={book} key={book._id || k} />); // Use unique book ID as key if available.

  return (
    <div className='ShowBookList'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Books List</h2>
          </div>
          <div className='col-md-11'>
            <Link href='/create-book' className='btn btn-outline-warning float-right'>
              + Add New Book
            </Link>
            <br /><br /><hr />
          </div>
        </div>
        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;
