import db from '../models';

export const handleGetSpecialist = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const specialist = await db.Specialist.findAll({ raw: true });
            resolve(specialist);
        } catch (e) {
            reject(e);
        }
    });
};
export const handleGetInfoDetailDoctor = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const infoDoctor = await db.Manager.findOne({
                where: { userId: id },
                include: [
                    {
                        model: db.MarkdownDoctor,
                        as: 'markdownData',
                        attributes: ['contentHTML', 'contentMarkdown', 'description'],
                    },
                    {
                        model: db.PhoneNumber,
                        as: 'phone',
                        attributes: ['phoneNumber'],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve(infoDoctor);
        } catch (e) {
            reject(e);
        }
    });
};
export const handleUpdateDetailDoctor = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Manager.update(user, { where: { userId: +user.userId } });
            const [markDown, markDownCreated] = await db.MarkdownDoctor.findOrCreate({
                where: { doctorId: +user.userId },
                defaults: {
                    contentHTML: user.contentHTML,
                    contentMarkdown: user.contentMarkdown,
                    description: user.description,
                },
            });
            if (markDown && !markDownCreated) {
                await db.MarkdownDoctor.update(user, { where: { doctorId: +user.userId } });
            }
            let result = '1';
            if (user.phoneNumber) {
                const [phone, phoneCreated] = await db.PhoneNumber.findOrCreate({
                    where: { userId: +user.userId },
                    defaults: {
                        phoneNumber: user.phoneNumber,
                        userId: +user.userId,
                    },
                });
                if (phone && !phoneCreated) {
                    await db.PhoneNumber.update(user, { where: { userId: +user.userId } });
                }
            }
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};
export const handleGetDoctorBySpecialist = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const infoDoctor = await db.User.findAll({
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: db.Manager,
                        where: { specialistId: id },
                        as: 'managerData',
                        include: [
                            {
                                model: db.Specialist,
                                as: 'specialistData',
                            },
                            {
                                model: db.MarkdownDoctor,
                                as: 'markdownData',
                                attributes: ['description'],
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve(infoDoctor);
        } catch (e) {
            reject(e);
        }
    });
};
export const handlePostCreateSpecialist = (specialist) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Specialist.create({ ...specialist });
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handlePutEditSpecialist = (specialist) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Specialist.update(specialist, { where: { id: specialist.id } });
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handleDeleteSpecialist = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Specialist.destroy({ where: { id: id } });
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
