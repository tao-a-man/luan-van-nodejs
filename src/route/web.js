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

    // API Chuyên khoa
    router.get('/api/get-specialist', appController.getSpecialist);
    router.get('/api/get-commodities', appController.getCommodities);
    router.get('/api/get-info-detail-doctor', appController.getInfoDetailDoctor);
    router.put('/api/update-detail-doctor', appController.updateDetailDoctor);
    return app.use('/', router);
}

export default initWebRoutes;
