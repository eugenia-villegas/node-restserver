import { request, response } from "express";
import Users from "../models/user.js";
import bcrypt from "bcryptjs";

const userGet = async(req = request, res = response) => {
    // const {name, age} = req.body;
    const query = {state: true}
    const { limit = 5, from = 0 } = req.query;
    // const users = await Users.find(query)
    //     .skip(Number(from))  
    //     .limit(Number(limit))  

    // const total = await Users.countDocuments(query);

    const [total, users ] = await Promise.all([
        Users.countDocuments(query),
        Users.find(query)
            .skip(Number(from))  
            .limit(Number(limit)),
        
    ])
    res.json({
        total,
        users
    })
}

const userPut = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, password, google, mail, ...others} = req.body;

    //Validate with DB
    if ( password ) {
        const salt = bcrypt.genSaltSync();
        others.password = bcrypt.hashSync(password, salt)
    }

    const user = await Users.findByIdAndUpdate(id, others)

    res.json(user);
}

const userPost = async(req = request, res = response) => {

    const {name, mail, password, role} = req.body;
    const user = new Users({name, mail, password, role});
    
    
    
    //Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    //Save on DB
    await user.save();

    res.json({
        msg: 'Hello World - post request',
        user
    })
}

const userDelete = async(req = request, res = response) => {
    const { id } = req.params;

    //Delete physically
    // const user = await Users.findByIdAndDelete(id);

    const user = await Users.findByIdAndUpdate(id, {state: false});

    res.json(user)
}

export {
    userGet,
    userPut,
    userPost,
    userDelete

}