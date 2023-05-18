import { authenticate } from '@/http/controllers/users/authenticate'
import { register } from '@/http/controllers/users/register'
import { profile } from '@/http/controllers/users/profile'
import { FastifyInstance} from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function UserRoutes(app: FastifyInstance) {

  app.post('/', register)
  app.post('/authenticate', authenticate)
  
  app.patch('/token/refresh', refresh)

  // #Authenticated Routes
  app.get('/profile', {
    onRequest: verifyJWT
  }, profile)
}