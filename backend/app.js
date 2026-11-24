import express from 'express'
import managerRoutes from './src/routes/managerRoutes.js'
import siteRoutes from './src/routes/siteRoutes.js'
import adminRoutes from './src/routes/adminRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import storeRoutes from './src/routes/storeRoutes.js'
import installationRoutes from './src/routes/installationRoutes.js'
import profileRoutes from './src/routes/profileRoutes.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

const app = express()

app.use(express.json())
app.use(managerRoutes)
app.use(siteRoutes)
app.use(adminRoutes)
app.use(userRoutes)
app.use(installationRoutes)
app.use(authRoutes)
app.use(storeRoutes)
app.use(profileRoutes)

app.use(errorHandler)

export default app
