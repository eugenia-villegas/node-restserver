import Role from "../models/role.js";
import Users from "../models/user.js"


const isRoleValid = async(role = '') => {
    const existRole = await Role.findOne({role});
    console.log(existRole);
    if (!existRole) {
        throw new Error(`Role is not registered in DB`)
    }
}

//Verify email exists
const isMailValid = async(mail = '') => {
const existMail = await Users.findOne({mail});
    if (existMail) {
        throw new Error(`Email ${mail} is already registered`)
    }
}

//Verify user exists
const isValidUserId = async(id) => {
    const existUserId = await Users.findById(id);
        if (!existUserId) {
            throw new Error(`ID \"${id}\" doesnt exist`)
        }
    }

export {
    isRoleValid,
    isMailValid,
    isValidUserId
}