import {
    handleLogin,
    handleGetUser,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
} from '../services/userServices';
const userController = (function home() {
    return {
        postLogin(req, res) {
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                res.status(200).json({ errCode: 1, errMessage: 'Invalid email or password' });
            } else {
                handleLogin(email, password)
                    .then((userChecked) => {
                        res.status(200).json({
                            errCode: userChecked.errCode,
                            errMessage: userChecked.errMessage,
                            token: userChecked.token,
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({ errCode: err.errCode, errMessage: err.errMessage });
                    });
            }
        },
        getUser(req, res) {
            handleGetUser()
                .then((user) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get User Success',
                        user: user,
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                        user: [],
                    });
                });
        },
        postCreateUser(req, res) {
            const data = req.body;
            handleCreateUser(data)
                .then(() => {
                    res.status(200).json({ errCode: 0, errMessage: 'User created successfully' });
                })
                .catch((err) => {
                    res.status(200).json({ errCode: 1, errMessage: err });
                });
        },
        postUpdateUser(req, res) {
            const data = req.body;
            handleUpdateUser(data)
                .then(() => {
                    res.status(200).json({ errCode: 0, errMessage: 'User update successfully' });
                })
                .catch((err) => {
                    res.status(200).json({ errCode: 1, errMessage: err });
                });
        },
        postDeleteUser(req, res) {
            const id = req.body.id;
            handleDeleteUser(id)
                .then(() => {
                    res.status(200).json({ errCode: 0, errMessage: 'User delete successfully' });
                })
                .catch((err) => {
                    res.status(200).json({ errCode: 1, errMessage: err });
                });
        },
        getProfile(req, res) {
            return res.json(req.currentUser);
        },
    };
})();

export default userController;
