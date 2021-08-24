import bcrypt from 'bcryptjs';

const signIn = (props) => {
	const {database} = props;
	return (req, res) => {
		const {email, password} = req.body;
		database.select('email', 'hash').from('login').where({'email': email})
			.then(data => {
				const loggedIn = bcrypt.compareSync(password, data[0].hash);
				if(loggedIn){
					database.select('*').from('users').where({'email': email})
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json('failed to sign in'));
				}else{
					res.status(400).json('failed to sign in')
				}
			})
			.catch(err => res.status(400).json('failed to sign in'));
	};
};

export default signIn;