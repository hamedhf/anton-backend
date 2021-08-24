import { response } from "express";

const register = (props) => {
	const {database} = props;

	return (req, res) => {
		const { name, email, password} = req.body;

		database('users')
			.returning('*')
			.insert({
				name, 
				email, 
				joined: new Date()
			})
			.then(user => res.json(user[0]))
			.catch(err => res.status(400).json('unable to register'));
	};
};

export default register;