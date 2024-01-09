import User from './User.js'

const { pg } = require('../models/database');

const signup = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {
        
    } catch(error) {
        this.sendServerError(error);
    }
}
const login = async (req, res) => {
    const email = req.body.email;8
    const password = req.body.password;
    try {
        //이거 쿼리문 바뀔
        const user = await pg.query('SELECT id, email, password, name FROM "User" WHERE email = ${email}', );
    } catch (error) {
        this.sendServerError(error);
    }
    
    //todo: 처리코드
    if (user === null) {
        res.status(404).json({ message: "존재하지 않는 메일입니다."});
    }
    if (password === user.password) {
        res.status(200).json({ id: user.id });
    } else {
        res.statuc(404).json({ message: "비밀번호가 틀렸습니다."});
    }
}
const isEmailRepeated = async (req, res) => {
        
}
const logout = async (res) => {

}
const modifyPassword = async (req, res) => {

}
function sendServerError(error) {
    console.error('Error in getting user by email:', error);
    res.status(500).send('Internal Server Error');  
}

module.export = { UserController };