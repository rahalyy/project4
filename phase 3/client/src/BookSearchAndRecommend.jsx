import React, { useState } from 'react';

function BookSearchAndRecommend() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    rating: 1
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Function to handle searching books using Google Books API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();

      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add recommendation
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = {};

    // Basic validation
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.author.trim()) errs.author = 'Author is required';
    if (formData.rating < 1 || formData.rating > 5) errs.rating = 'Rating must be 1-5';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const res = await fetch('http://localhost:5000/api/recommendations/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // If your backend requires auth token:
          // 'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        setMessage('Recommendation added successfully!');
        setFormData({ title: '', author: '', description: '', rating: 1 });
      } else {
        setMessage(result.message || 'Failed to add recommendation');
      }
    } catch (error) {
      console.error('Error adding recommendation:', error);
      setMessage('Server error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Books</h2>
      <input
        type="text"
        placeholder="Search by title, author, or genre"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ width: '300px', padding: '5px' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px' }}>Search</button>

      <div style={{ marginTop: '20px' }}>
        {books.length > 0 && books.map(book => (
          <div key={book.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{book.volumeInfo.title}</h3>
            <p><b>Author:</b> {book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
            <p>{book.volumeInfo.description?.slice(0, 200)}...</p>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" />
            )}
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '40px' }}>Add Your Book Recommendation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
        </div>

        <div>
          <label>Author:</label><br />
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          {errors.author && <div style={{ color: 'red' }}>{errors.author}</div>}
        </div>

        <div>
          <label>Description:</label><br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Rating (1-5):</label><br />
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
          />
          {errors.rating && <div style={{ color: 'red' }}>{errors.rating}</div>}
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>Add Recommendation</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default BookSearchAndRecommend;
