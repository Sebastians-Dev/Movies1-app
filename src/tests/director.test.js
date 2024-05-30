const request = require('supertest');
const app = require('../app');

let id;

test('GET/directors debe traer todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/directors debe crear un director', async () => {
    const newDirector = {
        firstName: 'test',
        lastName: 'test1',
        nationality: 'test2',
        image: 'test3',
        birthday: '2000-10-22'
    }
    const res = await request(app).post('/directors').send(newDirector);
    id =  res.body.id
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test('PUT/directors/:id debe actualizar un director', async () => {
    const updateDirector = {
        firstName: 'test update'
    }
    const res = await request(app).put('/directors/'+id).send(updateDirector);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateDirector.firstName);
});

test('DELETE/directors/:id debe eliminar un director', async () => {
    const res = await request(app).delete('/directors/'+id);
    expect(res.status).toBe(204);
});