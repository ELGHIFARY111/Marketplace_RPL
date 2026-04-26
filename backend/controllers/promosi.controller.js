// Template untuk Promosi Controller

const getAllPromos = async (req, res) => {
  try {
    // TODO: Query promos dari database
    res.json({ message: 'Get all promos' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPromoById = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Query promo dari database
    res.json({ message: `Get promo ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPromo = async (req, res) => {
  try {
    const { title, description, discount, start_date, end_date } = req.body;
    // TODO: Create promo di database
    res.status(201).json({ message: 'Promo created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Update promo di database
    res.json({ message: `Promo ${id} updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPromos,
  getPromoById,
  createPromo,
  updatePromo
};
