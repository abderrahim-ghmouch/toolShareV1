import * as userService from '../services/userService.js'
import { InvalidUserLoansQueryError } from '../services/userService.js'


export const listUsers = async function (req,res,next) {
    
    try {
    
        const users = await userService.listUsers()

        return res.status(200).json({ status: 'success', data:users})

    } catch (err)
    {

        next(err)
    }
}


export const createUser = async function (req,res,next) {
    
    try {

        const user = await userService.createUser(req.body)
        return res.status(201).json({status:'success',data:user})
    } catch (err) {
        
        next(err)
}

}

export async function getMyLoans(req, res, next) {
    const userId = req.user?._id?.toString()

    if (!userId) {
        return res.status(401).json({ error: 'Authentication required' })
    }

    try {
        const loans = await userService.getMyLoans(userId)
        return res.status(200).json(loans)
    } catch (error) {
        if (error instanceof InvalidUserLoansQueryError) {
            return res.status(400).json({ error: error.message })
        }

        return next(error)
    }
}

export default { getMyLoans }
