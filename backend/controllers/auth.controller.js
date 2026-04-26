// Template untuk Auth Controller
// Contoh: Login, Register, Logout

const login = async (req, res) => {
  try {
    // Implementasi login di sini
    res.json({ message: 'Login endpoint' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    // Implementasi register di sini
    res.json({ message: 'Register endpoint' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register };
