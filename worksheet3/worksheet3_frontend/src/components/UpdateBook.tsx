import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router'; // Correct import for useRouter
import Link from 'next/link';
import { Book, DefaultEmptyBook } from './Books';

function UpdateBookInfo() {
    const router = useRouter();
    const [book, setBook] = useState<Book>(DefaultEmptyBook);
    const { id } = router.query; // Correct way to get dynamic parameters in Next.js

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to fetch data for book ID: ${id}`);
                return res.json();
            })
            .then(setBook)
            .catch(err => console.error('Error from UpdateBookInfo:', err));
    }, [id]);

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!id) return;
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update the book');
                router.push(`/show-book/${id}`);
            })
            .catch(err => console.error('Error from UpdateBookInfo:', err));
    };

    return (
        <div className='UpdateBookInfo container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <br />
                    <Link href='/' className='btn btn-outline-warning float-left'>Show Book List</Link>
                    <h1 className='display-4 text-center'>Edit Book</h1>
                    <p className='lead text-center'>Update Book's Info</p>
                </div>
                <div className='col-md-8 m-auto'>
                    <form noValidate onSubmit={onSubmit}>
                        <div className='form-group'>
                            <label htmlFor='title'>Title</label>
                            <input type='text' placeholder='Title of the Book' name='title' className='form-control' value={book.title || ''} onChange={onChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='isbn'>ISBN</label>
                            <input type='text' placeholder='ISBN' name='isbn' className='form-control' value={book.isbn || ''} onChange={onChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='author'>Author</label>
                            <input type='text' placeholder='Author' name='author' className='form-control' value={book.author || ''} onChange={onChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <textarea placeholder='Description of the Book' name='description' className='form-control' value={book.description || ''} onChange={onChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='published_date'>Published Date</label>
                            <input type='date' name='published_date' className='form-control' value={book.published_date ? new Date(book.published_date).toISOString().substring(0, 10) : ''} onChange={onChange} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='publisher'>Publisher</label>
                            <input type='text' placeholder='Publisher of the Book' name='publisher' className='form-control' value={book.publisher || ''} onChange={onChange} />
                        </div>
                        <button type='submit' className='btn btn-outline-info btn-lg btn-block'>Update Book</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBookInfo;
