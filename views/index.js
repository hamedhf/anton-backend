const index = (props) => {
    const {database} = props;
    return (req, res) => {
        res.send('index page');
    };
};

export default index;