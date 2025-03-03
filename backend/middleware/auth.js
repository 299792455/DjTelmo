const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token manquant ou invalide' });
        }

        const decodedToken = jwt.verify(token, 'secret_key'); // Assure-toi que "secret_key" est la même clé utilisée pour générer le token
        req.user = { userId: decodedToken.userId, role: decodedToken.role }; // Inclut le rôle de l'utilisateur
        console.log('Utilisateur authentifié :', req.user); // Ajoute un log pour vérifier
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentification échouée' });
    }
};
