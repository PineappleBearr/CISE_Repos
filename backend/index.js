// Existing imports and setup
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://mrbear:hunao512@testdata.j7cyn.mongodb.net/booklist?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema and Model for Books
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: [String], required: true },
  source: { type: String, required: true },
  publication_year: { type: Number, required: true },
  doi: { type: String, required: true },
  summary: { type: String, required: true },
  linked_discussion: { type: String }
});

const Book = mongoose.model('Book', bookSchema);

// POST route to add a new book
app.post('/api/books', (req, res) => {
  const newBook = new Book(req.body);
  newBook.save()
    .then(() => res.status(201).json({ message: 'Book added successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// **New GET route to retrieve all books**
app.get('/api/books', (req, res) => {
  Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json({ error: err.message }));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
