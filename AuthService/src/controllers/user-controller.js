const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            success: true,
            message: "Successfully created user", 
            err: {}
        })
    } catch ({error}) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: error
        })
    }
}

const signIn = async(req, res)=>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);
        return res.status(201).json({
            data: response,
            success: true,
            message: "SignIn successful", 
            err: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            err: error
        })
    }
}

const isAuthenticated = async(req,res)=>{
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: "User is authenticated and token is valid",
            err: {}
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            err: error
        })
    }

}
const isUserwithRole = async (req, res)=>{
    try {
        const response = await userService.isUserwithRole(req.body.userId, req.body.userRole.toUpperCase());
        return res.status(200).json({
            data: response,
            success: true,
            message: "User has"+((response)?" the specific role defined":" no such role"),
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            data:{},
            success: false,
            message: "Something went wrong",
            err: error
        });
    }
}

module.exports = { 
    create,
    signIn,
    isAuthenticated,
    isUserwithRole
}