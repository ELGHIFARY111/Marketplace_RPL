// Template untuk User Controller
// Operasi: Get user profile, Update profile, Delete account

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: Query user dari database
    res.json({ message: `Get user ${userId} profile` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, address } = req.body;
    // TODO: Update user di database
    res.json({ message: `User ${userId} profile updated` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: Delete user dari database
    res.json({ message: `User ${userId} deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser
};
