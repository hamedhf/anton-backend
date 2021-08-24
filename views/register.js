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

        // database.users.push({
        //     id : '211',
        //     name : name,
        //     email : email,
        //     password : password,
        //     entries : 0,
        //     joined : new Date()
        // })
    };
};

export default register;