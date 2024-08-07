import React from 'react';
import { useRouter } from 'next/router'; // Corrected import
import { Book } from './Books';

interface IProp {
  book?: Book;
}

const BookCard = ({ book }: IProp) => {
  const router = useRouter();

  if (!book) {
    // If there is no book, we simply don't render the component
    return null;
  }

  const onClick = () => {
    // Navigate to the show-book page with the book's ID
    router.push(`/show-book/${book._id}`);
  };

  return (
    <div className='card-container' onClick={onClick} role="button" style={{ cursor: 'pointer' }}>
      <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d' // Sample image URL
        alt='Book cover'
        height={200}
        style={{ width: '100%' }} // Ensures the image covers the card width
      />
      <div className='desc'>
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default BookCard;
