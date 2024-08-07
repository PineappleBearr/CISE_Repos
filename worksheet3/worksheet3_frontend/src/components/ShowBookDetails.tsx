'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Corrected import
import Link from 'next/link';
import { Book, DefaultEmptyBook } from './Books'; // Ensure these are correctly defined and imported

function ShowBookDetails() {
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const router = useRouter();
  const { id } = router.query; // Use router.query to access the dynamic route parameters

  useEffect(() => {
    if (!id) return; // Guard clause if ID is undefined
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch the book with id ${id}`);
        }
        return res.json();
      })
      .then((json) => {
        setBook(json);
      })
      .catch((err) => {
        console.error('Error from ShowBookDetails:', err);
      });
  }, [id]);

  const onDeleteClick = () => {
    if (!id) return; // Guard clause if ID is undefined
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to delete the book with id ${id}`);
        }
        router.push('/'); // Navigate back to the home or book list page after deletion
      })
      .catch((err) => {
        console.error('Error from ShowBookDetails_deleteClick:', err);
      });
  };

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br />
            <Link href='/' className='btn btn-outline-warning float-left'>Show Book List</Link>
            <h1 className='display-4 text-center'>Book's Record</h1>
            <p className='lead text-center'>View Book's Info</p>
            <hr />
            <table className='table table-hover table-dark table-striped table-bordered'>
              <tbody>
                <tr><th scope='row'>1</th><td>Title</td><td>{book.title}</td></tr>
                <tr><th scope='row'>2</th><td>Author</td><td>{book.author}</td></tr>
                <tr><th scope='row'>3</th><td>ISBN</td><td>{book.isbn}</td></tr>
                <tr><th scope='row'>4</th><td>Publisher</td><td>{book.publisher}</td></tr>
                <tr><th scope='row'>5</th><td>Published Date</td><td>{book.published_date?.toLocaleDateString()}</td></tr>
                <tr><th scope='row'>6</th><td>Description</td><td>{book.description}</td></tr>
              </tbody>
            </table>
            <div className='col-md-6'>
              <button type='button' className='btn btn-outline-danger btn-lg btn-block' onClick={onDeleteClick}>
                Delete Book
              </button>
            </div>
            <div className='col-md-6'>
              <Link href={`/edit-book/${id}`} className='btn btn-outline-info btn-lg btn-block'>Edit Book</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;
