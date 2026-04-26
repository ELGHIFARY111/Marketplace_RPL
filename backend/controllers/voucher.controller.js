// Template untuk Voucher Controller

const getAllVouchers = async (req, res) => {
  try {
    // TODO: Query vouchers dari database
    res.json({ message: 'Get all vouchers' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVoucherById = async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Query voucher dari database
    res.json({ message: `Get voucher ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createVoucher = async (req, res) => {
  try {
    const { code, discount, max_usage } = req.body;
    // TODO: Create voucher di database
    res.status(201).json({ message: 'Voucher created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateVoucher = async (req, res) => {
  try {
    const { code } = req.body;
    // TODO: Validate voucher code
    res.json({ message: `Voucher ${code} is valid` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllVouchers,
  getVoucherById,
  createVoucher,
  validateVoucher
};
