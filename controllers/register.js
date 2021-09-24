const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body

    if(!email || !name || !password){
        return res.status(400).json('Fill all the blank fields')
    }

    const hash = bcrypt.hashSync(password, 10)
    db.transaction(trx => {
        trx('login')
        .insert({
            'hash': hash,
            'email': email
        })
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    'username': name,
                    'email': loginEmail[0]
                })
                .then(user => {
                    res.json(user[0])
                })
        })
        .then(trx.commit)
        .catch(trx.backroll)
        .catch(err => res.status(400).json('An error has ocurred'))
    })


}

module.exports = {
    handleRegister
};