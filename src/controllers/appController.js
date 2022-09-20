import {
    handleGetSpecialist,
    handleGetCommodities,
    handleUpdateDetailDoctor,
    handleGetInfoDetailDoctor,
    handleGetDoctorBySpecialist,
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
        getCommodities(req, res) {
            handleGetCommodities()
                .then((commodities) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Specialist Success',
                        commodities,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                        commodities: [],
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
        getProfile(req, res) {
            return res.json(req.currentUser);
        },
    };
})();

export default appController;
