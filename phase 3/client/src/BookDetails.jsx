import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    const res = await fetch(`http://localhost:5000/api/recommendations/${id}`);
    const data = await res.json();
    setBook(data);
  };

  const handleRatingSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/recommendations/${id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'replace_with_logged_in_user_id', value: Number(rating) })
    });

    if (res.ok) {
      fetchBookDetails();
      setRating('');
    } else {
      alert('Error submitting rating');
    }
  };

  if (!book) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <p className="text-lg text-gray-700 mb-2">Author: {book.author}</p>
      <p className="mb-4">{book.description}</p>
      <div className="mb-4">
        <span className="font-semibold">Average Rating:</span> {book.rating ? book.rating.toFixed(1) : 'Not rated yet'}
      </div>

      <form onSubmit={handleRatingSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Rate 1-5"
          value={rating}
          onChange={e => setRating(e.target.value)}
          min="1"
          max="5"
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Rating
        </button>
      </form>
    </div>
  );
}

export default BookDetails;
