import express from 'express';
import userController from '../controllers/userController';
import appController from '../controllers/appController';
import { auth } from '../middleware';

const router = express.Router();

function initWebRoutes(app) {
    // API User
    router.post('/api/login', userController.postLogin);
    router.post('/api/create-user', userController.postCreateUser);
    router.get('/api/get-all-user', auth, userController.getUser);
    router.put('/api/update-user', userController.postUpdateUser);
    router.delete('/api/delete-user', auth, userController.postDeleteUser);
    router.delete('/api/delete-hisrories-care', auth, userController.postDeleteHistoriesCare);

    // API Chuyên khoa;
    router.get('/api/get-info-detail-doctor', appController.getInfoDetailDoctor);
    router.put('/api/update-detail-doctor', appController.updateDetailDoctor);
    router.get('/api/get-doctor-by-specialist', appController.getDoctorBySpecialist);

    // Specialist
    router.get('/api/get-specialist', appController.getSpecialist);
    router.post('/api/create-specialist', appController.postCreateSpecialist);
    router.put('/api/edit-specialist', appController.putEditSpecialist);
    router.delete('/api/delete-specialist', appController.deleteSpecialist);

    // Schedule
    router.get('/api/get/schedule-by-doctor-id', appController.getScheduleByDoctorId);
    // auto run in every week
    router.post('/api/create-schedule-automatic', appController.postCreateScheduleAutomatic);
    // get all code by type = time\
    router.get('/api/get-all-code-type-time', appController.getAllcodeByType);
    //bulk update schedule
    router.patch('/api/bulk-update-schedule', appController.patchBulkUpdateSchedule);

    // Api Booking
    router.post('/api/post-create-booking', auth, appController.postCreateBooking);
    router.get('/api/get-booking-by-user-id', auth, appController.getBookingByUserId);
    router.delete('/api/delete-booking', appController.deleteBooking);
    router.put('/api/accept-booking', appController.acceptBooking);

    // Api reExam and historycare
    router.post('/api/post-create-historycare', auth, appController.postCreateHistoryCare);
    router.get('/api/get-historycare-by-doctor-id', auth, appController.getHistoryCare);
    router.get('/api/get-historycare-by-booking-id', auth, appController.getHistoryCareByBookingId);
    router.get('/api/get-historycare-have-re-exam', auth, appController.getHistoryCareHaveReExam);
    // Api reExam of PAtient
    router.get('/api/get-historycare-by-user-id', auth, userController.getHistoryCareByUser);
    // Auto mail by email of user
    router.post('/api/auto-mail-by-email', auth, appController.autoMailByEmail);

    return app.use('/', router);
}

export default initWebRoutes;
