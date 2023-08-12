const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', function () {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/) // supertest assertion
            .expect(200)

        // assertion by jest
        // expect(response.statusCode).toBe(200) 
    })
});

describe('Test POST /launches', function () {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028',
    }

    const launchDataWithouthDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'asdasdas',
    }

    test('It should respond with 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestDate = new Date(completeLaunchData.launchDate).valueOf()
        const responseDate = new Date(response.body.launchDate).valueOf()
        expect(responseDate).toBe(requestDate)

        expect(response.body).toMatchObject(launchDataWithouthDate)
    })

    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithouthDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Missing required launch property'
        })
    })

    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Invalid launch date'
        })
    })
});