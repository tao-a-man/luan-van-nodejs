import express from 'express';
import userController from '../controllers/userController';
import { auth } from '../middleware';

const router = express.Router();

function initWebRoutes(app) {
    // API
    router.post('/api/login', userController.postLogin);
    router.post('/api/create-user', userController.postCreateUser);
    router.get('/api/get-all-user', auth, userController.getUser);
    router.put('/api/update-user', userController.postUpdateUser);
    router.delete('/api/delete-user', auth, userController.postDeleteUser);

    return app.use('/', router);
}

export default initWebRoutes;
