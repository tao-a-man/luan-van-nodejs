import {
    handleLogin,
    handleGetUser,
    handleCreateUser,
    handleUpdateUser,
    handleDeleteUser,
    handleGetHistoryCareByUser,
    handlePostDeleteHistoriesCare,
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
                            token: userChecked.token ? userChecked.token : null,
                            roleId: userChecked.user ? userChecked.user.managerData.roleId : null,
                            firstName: userChecked.user ? userChecked.user.firstName : null,
                            lastName: userChecked.user ? userChecked.user.lastName : null,
                            email: userChecked.user ? userChecked.user.email : null,
                            age: userChecked.user ? userChecked.user.age : null,
                            id: userChecked.user ? userChecked.user.id : null,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
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
        getHistoryCareByUser(req, res) {
            const id = req.currentUser;
            handleGetHistoryCareByUser(id)
                .then((data) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get User Success',
                        data: data,
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
        postDeleteHistoriesCare(req, res) {
            const id = req.body.id;
            const idTime = req.body.idTime;
            handlePostDeleteHistoriesCare(id, idTime)
                .then(() => {
                    res.status(200).json({ errCode: 0, errMessage: 'User delete successfully' });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(200).json({ errCode: 1, errMessage: err });
                });
        },
        getProfile(req, res) {
            return res.json(req.currentUser);
        },
    };
})();

export default userController;
