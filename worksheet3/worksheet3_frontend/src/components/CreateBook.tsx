import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Book, DefaultEmptyBook } from "./Books";

const CreateBookComponent = () => {
  const router = useRouter();
  const [book, setBook] = useState<Book>(DefaultEmptyBook);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to manage error status

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book)
      });
      if (!response.ok) {
        throw new Error('Failed to create the book');
      }
      setBook(DefaultEmptyBook);
      router.push("/"); // Navigate to the home page or book list
    } catch (error: any) {
      console.error('Error from CreateBook:', error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="CreateBook container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <br />
          <Link href="/" className="btn btn-outline-warning float-left">
            Show Book List
          </Link>
        </div>
        <div className="col-md-10 m-auto">
          <h1 className="display-4 text-center">Add Book</h1>
          <p className="lead text-center">Create new book</p>
          <form noValidate onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Title of the Book"
                name="title"
                className="form-control"
                value={book.title}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="ISBN"
                name="isbn"
                className="form-control"
                value={book.isbn}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Author"
                name="author"
                className="form-control"
                value={book.author}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Describe this book"
                name="description"
                className="form-control"
                value={book.description}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="date"
                placeholder="Published Date"
                name="published_date"
                className="form-control"
                value={book.published_date ? book.published_date.toString().substring(0, 10) : ''}
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Publisher of this Book"
                name="publisher"
                className="form-control"
                value={book.publisher}
                onChange={onChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Submit'}
            </button>
          </form>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default CreateBookComponent;
