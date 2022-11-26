import db from '../models';
import mailer from '../util/mailer';
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;

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
                    where: { doctorId: id, status: ['Đã xác nhận', 'Đặt thành công'] },
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
            const today = new Date();
            var formatToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
            const schedule = await db.Schedule.findAll({
                where: {
                    [Op.and]: [{ date: { [Op.gte]: formatToday } }, { doctorId: id }],
                },
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
            var today = new Date();
            // delete Schedule today
            var formatToday = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
            await db.Schedule.destroy({
                where: {
                    [Op.and]: [{ date: formatToday }, { isBooking: false }],
                },
            });
            // add Schedule next week
            var nextweek = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, 0));
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
            const date = new Date();
            const infoMail = `<h4>Bạn đã đặt lịch khám thành công vào ngày ${date.toLocaleDateString()}</h4><br></br>Thời gian khám: ${
                infoBooking.date
            }<br></br>Tại: ${infoBooking.addressPatient}`;
            mailer.sendMail(infoBooking.email, 'Auto Mail BookingCare', infoMail);
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
            const check = await db.Booking.destroy({
                where: {
                    [Op.and]: [{ scheduleId }, { status: ['Đặt thành công', 'Đã xác nhận'] }],
                },
            });
            if (check) {
                await db.Schedule.update({ isBooking: false }, { where: { id: scheduleId } });
            }
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handleAcceptBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Booking.update({ status: 'Đã xác nhận' }, { where: { id: bookingId } });
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handlePostCreateHistoryCare = (data, doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let scheduleInstance = '';
            if (data.re) {
                await db.HistoriesCare.update({ status: 'Đã khám' }, { where: { bookingId: data.bookingId } });
            }
            if (data.time && data.date) {
                scheduleInstance = await db.Schedule.findOne({
                    where: {
                        timeType: data.time,
                        date: data.date,
                        doctorId: doctorId,
                    },
                });
                await db.Schedule.update(
                    { isBooking: true },
                    {
                        where: {
                            timeType: data.time,
                            date: data.date,
                            doctorId: doctorId,
                        },
                    },
                );
                await db.HistoriesCare.create({ ...data, timeReExam: scheduleInstance.id, status: 'Chưa khám' });
                await db.Booking.update({ status: 'Đã khám' }, { where: { id: data.bookingId } });
            } else {
                await db.HistoriesCare.create({ ...data, timeReExam: scheduleInstance.id, status: 'Không tái khám' });
                await db.Booking.update({ status: 'Đã khám' }, { where: { id: data.bookingId } });
            }
            resolve();
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handleGetHistoryCare = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.HistoriesCare.findAll({
                group: ['bookingId'],
                include: [
                    {
                        model: db.Booking,
                        where: {
                            [Op.or]: [
                                {
                                    doctorId: doctorId,
                                },
                                {
                                    userId: doctorId,
                                },
                            ],
                        },
                        as: 'bookingData',
                    },
                    {
                        model: db.Schedule,
                        as: 'scheduleData',
                        include: [
                            {
                                model: db.Allcode,
                                as: 'timeData',
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve(data);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handleGetHistoryCareByBookingId = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.HistoriesCare.findAll({
                where: { bookingId: bookingId },
                include: [
                    {
                        model: db.Booking,
                        as: 'bookingData',
                    },
                    {
                        model: db.Schedule,
                        as: 'scheduleData',
                        include: [
                            {
                                model: db.Allcode,
                                as: 'timeData',
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve(data);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
export const handleGetHistoryCareHaveReExam = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await db.HistoriesCare.findAll({
                where: { status: 'Chưa khám' },
                include: [
                    {
                        model: db.Booking,
                        as: 'bookingData',
                        where: {
                            [Op.or]: [
                                {
                                    userId: id,
                                },
                                {
                                    doctorId: id,
                                },
                            ],
                        },
                        include: [
                            {
                                model: db.Manager,
                                as: 'managerData',
                                attributes: { exclude: ['image'] },
                                include: [{ model: db.User, as: 'userData', attributes: ['firstName', 'lastName'] }],
                            },
                        ],
                    },
                    {
                        model: db.Schedule,
                        as: 'scheduleData',
                        include: [
                            {
                                model: db.Allcode,
                                as: 'timeData',
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve(data);
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });
};
