const userInfo = (props) => {
    const {database} = props;

    return (req, res) => {
        const { id } = req.params;
        database.users.every( user => {
            if(user.id === id){
                res.json(user);
                return false;
            }
            return true;
        });
        res.status(404).json('no such user');
    };
};

export default userInfo;