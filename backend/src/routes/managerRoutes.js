import { Router } from 'express'

import managerController, { createManager, changeAssignment } from '../controllers/managerController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { authorize } from '../middlewares/roleMiddelware.js'

const router = Router()

const managerOnly = [authMiddleware, authorize('manager')]
const adminOnly = [authMiddleware, authorize('admin')]

// admin only: create managers and define (or change) their store
router.post('/api/managers', ...adminOnly, createManager)
router.patch('/api/managers/:id/store', ...adminOnly, changeAssignment)

// manager only
router.get('/api/managers/equipment', ...managerOnly, managerController.listEquipment)
router.post('/api/managers/equipment', ...managerOnly, managerController.createEquipment)
router.get('/api/managers/equipment/:equipmentId', ...managerOnly, managerController.getEquipment)
router.patch('/api/managers/equipment/:equipmentId', ...managerOnly, managerController.updateEquipment)
router.patch(
    '/api/managers/equipment/:equipmentId/availability',
    ...managerOnly,
    managerController.setEquipmentAvailability
)
router.delete('/api/managers/equipment/:equipmentId', ...managerOnly, managerController.deactivateEquipment)
router.post(
    '/api/managers/reservations/:reservationId/handover',
    ...managerOnly,
    managerController.handOverReservation
)
router.post(
    '/api/managers/reservations/:reservationId/return',
    ...managerOnly,
    managerController.returnReservation
)
router.get('/api/managers/loans/overdue', ...managerOnly, managerController.listOverdueLoans)
router.get('/api/managers/movements', ...managerOnly, managerController.listManagerMovements)
router.post('/api/managers/users', ...managerOnly, managerController.createUser)
router.get('/api/managers/sites', ...managerOnly, managerController.getSites)
router.put('/api/managers/:managerId/sites', ...adminOnly, managerController.replaceSites)

export default router
