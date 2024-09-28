const mongoose = require('mongoose');
const fs = require('fs');

// Corrected MongoDB connection string specifying the booklist database
const mongoURI = 'mongodb+srv://mrbear:hunao512@testdata.j7cyn.mongodb.net/booklist?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected to booklist database'))
  .catch(err => console.error('MongoDB connection error:', err));

const YourSchema = new mongoose.Schema({}, { strict: false });
const YourModel = mongoose.model('books', YourSchema);

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

YourModel.insertMany(data)
  .then(() => {
    console.log('Data imported successfully into books collection');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error importing data:', err);
  });

