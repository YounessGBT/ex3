const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../bd/user').default; // Modèle utilisateur
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

class UsersController {
    // Connexion d'un administrateur
    async adminLogin(req, res) {
        try {
            const { email, password } = req.body;

            // Vérifier si l'utilisateur existe
            const admin = await User.query().findOne({ email, role: 'admin' });
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            // Vérifier le mot de passe
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Générer un token JWT
            const token = jwt.sign({ id: admin.id, role: admin.role }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // Inscription d'un utilisateur
    async registerUser(req, res) {
        try {
            const { username, email, password, role } = req.body;

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.query().findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hacher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer un nouvel utilisateur
            const newUser = await User.query().insert({
                username,
                email,
                password: hashedPassword,
                role: role || 'user', // Par défaut, le rôle est "user"
            });

            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }

    // Connexion d'un utilisateur
    async userLogin(req, res) {
        try {
            const { email, password } = req.body;

            // Vérifier si l'utilisateur existe
            const user = await User.query().findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Vérifier le mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Générer un token JWT
            const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
}

module.exports = UsersController;