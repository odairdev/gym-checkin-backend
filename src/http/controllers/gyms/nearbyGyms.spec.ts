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

  it('should be able to search nearby gyms', async () => {
    const token = await createAndAuthenticateUse(app)

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Javascript Gym',
      description: 'some description',
      phone: '',
      latitude: -26.9055772,
      longitude: -48.6467763
    })

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'Typescript Gym',
      description: 'some description',
      phone: '',
      latitude: -28.9055772,
      longitude: -50.6467763
    })

    const response = await request(app.server).post('/gyms/nearby').set('Authorization', `Bearer ${token}`).send({
      userLatitude: -26.9055772,
      userLongitude: -48.6467763
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toEqual(expect.objectContaining([
      expect.objectContaining({
        title: 'Javascript Gym'
      })
    ]))
  })
})