import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import db from '../models';
function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({ where: { email: email }, raw: true });
            if (user) {
                resolve(user);
            } else {
                resolve(user);
            }
        } catch (e) {
            reject(e);
        }
    });
};

export const handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userExist = await checkEmail(email);
            const userChecked = {};
            if (userExist) {
                bcrypt.compare(password, userExist.password, (err, res) => {
                    if (err) {
                        userChecked.errCode = 5;
                        userChecked.errMessage = 'Compare password failed';
                    }
                    if (res) {
                        userChecked.errCode = 0;
                        userChecked.errMessage = 'Login Success';
                        delete userExist.password;
                        userChecked.user = userExist;
                        const token = jwt.sign({ id: userChecked.user.id }, 'shhhhh');
                        userChecked.token = token;
                        resolve(userChecked);
                    } else {
                        userChecked.errCode = 3;
                        userChecked.errMessage = 'Password not match';
                        resolve(userChecked);
                    }
                });
            } else {
                userChecked.errCode = 2;
                userChecked.errMessage = 'Email not found';
                resolve(userChecked);
            }
        } catch (e) {
            reject({ errCode: 4, errMessage: 'Error system!!' });
        }
    });
};
export const handleGetUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll({ attributes: { exclude: ['password'] }, limit: 10 });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    });
};
export const handleCreateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const passwordHash = hashPassword(data.password);
            await db.User.create({
                ...data,
                password: passwordHash,
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};
export const handleUpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.update(data, {
                where: { id: data.id },
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};
export const handleDeleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.User.destroy({ where: { id } });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};
