const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');

exports.signUp = (req, res, next) => {
    const regexpEmail = new RegExp(
        /[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\.\-_]*\.[a-z]*/
    );

    if (regexpEmail.test(req.body.email)) {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                })
                user.save()
                    .then(() => res.status(200).json({ message: 'Nouvel utilisateur créé !'}))
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
    } else {
        res.status(400).json({ message: 'Veuillez utilisé un email valide !' })
    }
};

exports.signIn = (req, res, next) => {
    User.findOne({ email: req.body.email})
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'paire email/mot de passe incorrecte'})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'paire email/mot de passe incorrecte' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.KEY_TOKEN,
                            { expiresIn: '24h', }
                        ),
                    })
                })
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}