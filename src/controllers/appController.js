import {
    handleGetSpecialist,
    handleUpdateDetailDoctor,
    handleGetInfoDetailDoctor,
    handleGetDoctorBySpecialist,
    handlePostCreateSpecialist,
    handlePutEditSpecialist,
    handleDeleteSpecialist,
} from '../services/appServices';
const appController = (function home() {
    return {
        getSpecialist(req, res) {
            handleGetSpecialist()
                .then((specialist) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Specialist Success',
                        specialist,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                        specialist: [],
                    });
                });
        },

        updateDetailDoctor(req, res) {
            handleUpdateDetailDoctor(req.body)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Update Doctor Success',
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err,
                    });
                });
        },
        getInfoDetailDoctor(req, res) {
            const id = req.query.id;
            handleGetInfoDetailDoctor(id)
                .then((respon) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Doctor Success',
                        infoDetailDoctor: respon,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err,
                    });
                });
        },
        getDoctorBySpecialist(req, res) {
            const id = req.query.id;
            handleGetDoctorBySpecialist(id)
                .then((respon) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Doctor Success',
                        infoDetailDoctor: respon,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err,
                    });
                });
        },
        postCreateSpecialist(req, res) {
            const specialist = req.body;
            handlePostCreateSpecialist(specialist)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Create Specialist Success',
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err,
                    });
                });
        },
        putEditSpecialist(req, res) {
            const specialist = req.body;
            handlePutEditSpecialist(specialist)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Edit Specialist Success',
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err,
                    });
                });
        },
        deleteSpecialist(req, res) {
            const id = req.body.id;
            handleDeleteSpecialist(id)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Delete Specialist Success',
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err,
                    });
                });
        },
        getProfile(req, res) {
            return res.json(req.currentUser);
        },
    };
})();

export default appController;
