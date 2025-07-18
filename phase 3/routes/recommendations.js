
router.get('/:id', async (req, res) => {
  try {
    const book = await Recommendation.findById(req.params.id).populate('user', 'username');
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
