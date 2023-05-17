import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const authResponse = await request(app.server).post('/users/authenticate').send({
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server).get('/users/profile').set('Authorization', `Bearer ${token}`)

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(expect.objectContaining({
      email: expect.any(String)
    }))
  })
})