// Template untuk Category Controller

const getAllCategories = async (req, res) => {
  try {
    // TODO: Query categories dari database
    res.json({ message: 'Get all categories' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Query category dari database
    res.json({ message: `Get category ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // TODO: Insert category ke database
    res.status(201).json({ message: 'Category created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    // TODO: Update category di database
    res.json({ message: `Category ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Delete category dari database
    res.json({ message: `Category ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
