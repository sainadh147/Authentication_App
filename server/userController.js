const User = require('./User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate password length
    if (password.length < 4) {
      return res.status(400).send('Password must be at least 4 characters long');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(500).send('Error creating user');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate password length
    if (password.length < 4) {
      return res.status(400).send('Password must be at least 4 characters long');
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};
