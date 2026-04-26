// Template untuk Kurir (Shipping) Controller

const getAllShippers = async (req, res) => {
  try {
    // TODO: Query shippers dari database
    res.json({ message: 'Get all shippers' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getShippingCost = async (req, res) => {
  try {
    const { origin, destination, weight } = req.body;
    // TODO: Calculate shipping cost
    res.json({ message: 'Shipping cost calculated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const trackShipment = async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    // TODO: Get tracking info
    res.json({ message: `Tracking info for ${trackingNumber}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllShippers,
  getShippingCost,
  trackShipment
};
