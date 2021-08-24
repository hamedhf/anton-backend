const userInfo = (props) => {
	const {database} = props;

	return (req, res) => {
		const { id } = req.params;

		database.select('*').from('users').where({id})
			.then(usersArray => {
				if(usersArray.length === 0){
					res.status(400).json('no such user');
				}else{
					res.json(usersArray[0]);
				}
			})
			.catch(err => res.status(400).json('error getting user'));
	};
};

export default userInfo;