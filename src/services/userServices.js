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
            const user = await db.User.findOne({
                where: { email: email },
                include: [
                    {
                        model: db.Manager,
                        as: 'managerData',
                        attributes: ['roleId'],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve(user);
        } catch (e) {
            console.log(e);
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
            const user = await db.User.findAll({
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: db.Manager,
                        as: 'managerData',
                        attributes: ['roleId'],
                        where: { roleId: ['R2'] },
                    },
                ],
                raw: true,
                nest: true,
            });
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
            const user = await db.User.create({
                ...data,
                password: passwordHash,
            });
            if (data.roleId) {
                await db.Manager.create({
                    userId: user.dataValues.id,
                    roleId: 'R2',
                    position: 'Bác sĩ',
                });
            }
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
            const newData = { ...data };
            delete newData.id;
            await db.Manager.update(newData, {
                where: { userId: data.id },
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
