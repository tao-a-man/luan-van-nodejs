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
export const handleGetBookingByUserId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await db.Manager.findOne({ where: { userId: id }, attributes: ['roleId'] });
            if (role) {
                const doctor = await db.Booking.findAll({
                    where: { doctorId: id },
                    include: [
                        {
                            model: db.Manager,
                            as: 'managerData',
                            attributes: { exclude: ['image'] },
                            include: [
                                {
                                    model: db.User,
                                    as: 'userData',
                                    attributes: ['firstName', 'lastName'],
                                },
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve(doctor);
            } else {
                const doctor = await db.Booking.findAll({
                    where: { userId: id },
                    include: [
                        {
                            model: db.Manager,
                            as: 'managerData',
                            attributes: { exclude: ['image'] },
                            include: [
                                {
                                    model: db.User,
                                    as: 'userData',
                                    attributes: ['firstName', 'lastName'],
                                },
                            ],
                        },
                    ],
                    raw: true,
                    nest: true,
                });
                resolve(doctor);
            }
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
            resolve();
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
                        where: { specialistId: id, roleId: 'R2' },
                        as: 'managerData',
                        include: [
                            {
                                model: db.Specialist,
                                as: 'specialistData',
                            },
                            {
                                model: db.MarkdownDoctor,
                                as: 'markdownData',
                                attributes: ['description', 'contentHTML'],
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
export const handleGetScheduleByDoctorId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const schedule = await db.Schedule.findAll({
                where: { doctorId: id },
            });
            resolve(schedule);
        } catch (e) {
            reject(e);
        }
    });
};
export const handlePostCreateScheduleAutomatic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('hi');
            var today = new Date();
            // delete Schedule today
            var formatToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
            await db.Schedule.destroy({ where: { date: formatToday } });
            // add Schedule next week
            var nextweek = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 13, 0, 0, 0));
            const ids = await db.Manager.findAll({ where: { roleId: 'R2' }, attributes: ['userId'] });
            const timeType = await db.Allcode.findAll({ where: { type: 'TIME' }, attributes: ['keyMap'] });

            var newArray = [];
            ids.forEach((id) => {
                timeType.forEach((time) => {
                    newArray.push({
                        doctorId: id.userId,
                        timeType: time.keyMap,
                        date: nextweek,
                        isBooking: false,
                        isDoing: true,
                    });
                });
            });
            await db.Schedule.bulkCreate(newArray);
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handleGetAllcodeByType = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const infoDoctor = await db.Allcode.findAll({
                where: { type: 'TIME' },
                attributes: ['keyMap', 'valueVi'],
                raw: true,
            });
            resolve(infoDoctor);
        } catch (e) {
            reject(e);
        }
    });
};
export const handlePatchBulkUpdateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctorId = data.id;
            const date = new Date(`${data.date}`);
            const times = data.times;
            await db.Schedule.update(
                { isDoing: true },
                {
                    where: {
                        date: date,
                        doctorId: doctorId,
                    },
                },
            );
            await db.Schedule.update(
                { isDoing: false },
                {
                    where: {
                        timeType: times,
                        date: date,
                        doctorId: doctorId,
                    },
                },
            );
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
export const handlePostCreateBooking = (infoBooking, currentUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Booking.create({ ...infoBooking, userId: currentUser });
            await db.Schedule.update({ isBooking: true }, { where: { id: infoBooking.scheduleId } });
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handleDeleteBooking = (scheduleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Booking.destroy({ where: { scheduleId } });
            await db.Schedule.update({ isBooking: false }, { where: { id: scheduleId } });
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
