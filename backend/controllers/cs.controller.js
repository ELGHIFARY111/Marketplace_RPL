// Template untuk CS (Customer Service) Controller

const getAllMessages = async (req, res) => {
  try {
    // TODO: Query CS messages dari database
    res.json({ message: 'Get all messages' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    // TODO: Query CS messages untuk user
    res.json({ message: `Get messages for user ${userId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message, subject } = req.body;
    // TODO: Create CS message di database
    res.status(201).json({ message: 'Message sent to CS' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const replyMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    // TODO: Add reply ke CS message
    res.json({ message: `Reply sent for message ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMessages,
  getUserMessages,
  createMessage,
  replyMessage
};
