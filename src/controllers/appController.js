import {
    handleGetSpecialist,
    handleUpdateDetailDoctor,
    handleGetInfoDetailDoctor,
    handleGetDoctorBySpecialist,
    handlePostCreateSpecialist,
    handlePutEditSpecialist,
    handleDeleteSpecialist,
    handleGetScheduleByDoctorId,
    handlePostCreateScheduleAutomatic,
    handleGetAllcodeByType,
    handlePatchBulkUpdateSchedule,
    handlePostCreateBooking,
    handleGetBookingByUserId,
    handleDeleteBooking,
    handleAcceptBooking,
    handlePostCreateHistoryCare,
    handleGetHistoryCare,
    handleGetHistoryCareByBookingId,
    handleGetHistoryCareHaveReExam,
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
        getScheduleByDoctorId(req, res) {
            const id = req.query.id;
            handleGetScheduleByDoctorId(id)
                .then((respon) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Doctor Success',
                        schedule: respon,
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
        postCreateScheduleAutomatic(req, res) {
            handlePostCreateScheduleAutomatic()
                .then((respon) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Doctor Success',
                        time: respon,
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
        getAllcodeByType(req, res) {
            handleGetAllcodeByType()
                .then((respon) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Doctor Success',
                        time: respon,
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
        patchBulkUpdateSchedule(req, res) {
            handlePatchBulkUpdateSchedule(req.body)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Update Schedule Success',
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
        postCreateBooking(req, res) {
            const infoBooking = req.body;
            const currentUser = req.currentUser;
            handlePostCreateBooking(infoBooking, currentUser)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage:
                            '?????t l???ch th??nh c??ng vui l??ng ki???m tra email c???a t??i kho???n hi???n t???i ????? x??c nh???n ho??n th??nh ?????t l???ch',
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err,
                    });
                });
        },
        getBookingByUserId(req, res) {
            const id = req.currentUser;
            handleGetBookingByUserId(id)
                .then((booking) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Get Booking Success',
                        booking,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                        booking: [],
                    });
                });
        },
        deleteBooking(req, res) {
            const scheduleId = req.body.scheduleId;
            handleDeleteBooking(scheduleId)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Delete Booking Success',
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                    });
                });
        },
        acceptBooking(req, res) {
            const bookingId = req.body.id;
            handleAcceptBooking(bookingId)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Delete Booking Success',
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                    });
                });
        },
        postCreateHistoryCare(req, res) {
            const data = req.body;
            const id = req.currentUser;
            handlePostCreateHistoryCare(data, id)
                .then(() => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Create Hisrory Success',
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                    });
                });
        },
        getHistoryCare(req, res) {
            const id = req.currentUser;
            handleGetHistoryCare(id)
                .then((data) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Create Hisrory Success',
                        data,
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                    });
                });
        },
        getHistoryCareByBookingId(req, res) {
            const id = req.query.bookingId;
            handleGetHistoryCareByBookingId(id)
                .then((data) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Create Hisrory Success',
                        data,
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                    });
                });
        },
        getHistoryCareHaveReExam(req, res) {
            const id = req.currentUser;
            handleGetHistoryCareHaveReExam(id)
                .then((data) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Create Hisrory Success',
                        data,
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                    });
                });
        },
        autoMailByEmail(req, res) {
            const id = req.currentUser;
            const email = req.body.email;
            handleAutoMailByEmail(id, email)
                .then((data) => {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Create Hisrory Success',
                        data,
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        errCode: 1,
                        errMessage: err.errMessage,
                    });
                });
        },
        getProfile(req, res) {
            return res.json(req.currentUser);
        },
    };
})();

export default appController;
