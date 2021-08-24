import bcrypt from 'bcryptjs';

const register = (props) => {
	const {database} = props;

	return (req, res) => {
		const { name, email, password} = req.body;
		const hash = bcrypt.hashSync(password);

		database.transaction(trx => {
			trx.insert({
				email,
				hash
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name,  
						joined: new Date()
					})
					.then(user => res.json(user[0]))
			})
			.then(trx.commit)
			.catch(trx.rollback);
		})
		.catch(err => res.status(400).json('unable to register'));

	};
};

export default register;