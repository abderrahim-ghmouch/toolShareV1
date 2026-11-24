'use strict'

import userModel from '../models/userModel.js'
import reservationModel from '../models/reservationModel.js'

export async function listUsers() {

    return userModel.find({})
}

export async function findUserById(id) {


    return userModel.findById(id)
}


export async function findUserByEmail(email, { withPassword = false} = {}) {
    const query = userModel.findOne({ email })
    
    return withPassword ? query.select('+password') : query
}



export async function createUser(userData) {
    return userModel.create(userData)
}

export async function deleteUser(id) {
    return userModel.findByIdAndDelete(id)
}


export async function updateUser(id, userData) {
    
        return userModel.findByIdAndUpdate(id, userData, {
        new: true,
        runValidators: true
    })
}


export async function userStats(id, active) {
        
        return userModel.findByIdAndUpdate(
        id,
        { $set: { active } },
        { new: true, runValidators: true }
    )
}
export async function findUserByIdWithPassword(id) {

    return userModel.findById(id).select('+password')
}

export default {
    listUsers,
    findUserById,
    findUserByEmail,
    createUser,
    deleteUser,
    updateUser,
    userStats,
    findUserByIdWithPassword,
    listUserReservations
}

export async function listUserReservations(userId) {
    return reservationModel.find({ user: userId })
        .select('_id equipment site startDate endDate status handedOverAt handedOverBy returnedAt returnedBy returnCondition createdAt updatedAt')
        .sort({ startDate: -1 })
        .populate('equipment', 'name description')
        .populate('site', 'name')
        .populate('handedOverBy', 'name email')
        .populate('returnedBy', 'name email')
        .lean()
}
