const request = require('supertest');
const app = require('../app');

let id;

test('GET/actors debe tarer todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/actors debe crear un actor', async () => {
    const newActor = {
        firstName: 'test',
        lastName: 'test1',
        nationality: 'test2',
        image: 'test3',
        birthday: '2000-10-22'
    }
    const res = await request(app).post('/actors').send(newActor);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(newActor.firstName);
});

test('PUT/actors/:id debe actualizar un actor', async () => {
    const updateActor ={
        firstName: 'test update'
    }
    const res = await request(app).put('/actors/'+id).send(updateActor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateActor.firstName);
});

test('DELETE/actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204);
});