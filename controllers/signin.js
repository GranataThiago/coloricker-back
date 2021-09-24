const handleSignIn =  (req, res, db, bcrypt) => {

    const { email, password } = req.body

    if(!email || !password){
        return res.status(400).json('Fill all the blank fields')
    }

    db('login').select('email', 'hash')
        .where('email', '=', email)
        .then(data => {
            const isCorrect = bcrypt.compareSync(password, data[0].hash);

            if(isCorrect){
                return db('users')
                    .select('*')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Error while getting user'))
            }else{
                res.status(400).json('Incorrect email or password.')
            }

        })
        .catch(err => res.status(400).json('Incorrect email or password.'))
}

module.exports = {
    handleSignIn
}