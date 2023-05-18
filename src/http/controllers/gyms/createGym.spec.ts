import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUse } from '@/utils/test/create=and-authenticate-user'

describe('Create Gym Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const token = await createAndAuthenticateUse(app)

    const response = await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Javascript Gym',
      description: 'some description',
      phone: '',
      latitude: -26.9055772,
      longitude: -48.6467763
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(expect.objectContaining({
      title: 'Javascript Gym'
    }))
  })
})