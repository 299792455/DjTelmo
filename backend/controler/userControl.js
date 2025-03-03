const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Connexion de l'utilisateur
exports.login = async (req, res) => {
  console.log('Requête de login reçue pour:', req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secret_key',
      { expiresIn: '24h' }
    );

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupération des informations de l'utilisateur connecté
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
