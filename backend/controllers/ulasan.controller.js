// Template untuk Review/Ulasan Controller

const getAllReviews = async (req, res) => {
  try {
    // TODO: Query reviews dari database
    res.json({ message: 'Get all reviews' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    // TODO: Query reviews untuk product
    res.json({ message: `Get reviews for product ${productId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, rating, comment } = req.body;
    // TODO: Create review di database
    res.status(201).json({ message: 'Review created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    // TODO: Update review di database
    res.json({ message: `Review ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Delete review dari database
    res.json({ message: `Review ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReviews,
  getProductReviews,
  createReview,
  updateReview,
  deleteReview
};
