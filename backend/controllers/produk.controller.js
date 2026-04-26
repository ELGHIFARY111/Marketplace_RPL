// Template untuk Product Controller
// Operasi: Create, Read, Update, Delete

const getAllProducts = async (req, res) => {
  try {
    // TODO: Query ke database
    // const products = await db.query('SELECT * FROM products');
    res.json({ message: 'Get all products' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Query ke database
    res.json({ message: `Get product ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id, stock } = req.body;
    // TODO: Insert ke database
    res.status(201).json({ message: 'Product created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, stock } = req.body;
    // TODO: Update database
    res.json({ message: `Product ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Delete dari database
    res.json({ message: `Product ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
