const index = (props) => {
    const {database} = props;
    return (req, res) => {
        res.send(database.users);
    };
};

export default index;