const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');

let id;

test('GET/movies debe traer todas las movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/movies debe crear una movie', async () => {
    const newMovie ={
        name: 'test',
        image:'test1',
        synopsis: 'test2',
        releaseYear: 2000
    }
    const res = await request(app).post('/movies').send(newMovie);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(newMovie.name);
});

test('PUT/movies/:id debe actualizar una movie', async () => {
    const updateMovie ={
        name: 'test update'
    }
    const res = await request(app).put('/movies/'+id).send(updateMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateMovie.name);
});

test('POST/movies/id/actors debe insertar un actor a la pelicula', async () => {
    const actor = await Actors.create({
        firstName: 'test',
        lastName: 'test1',
        nationality: 'test2',
        image: 'test3',
        birthday: '2000-10-22'
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/movies/id/directors debe insertar un director a la pelicula', async () => {
    const directors = await Directors.create({
        firstName: 'test',
        lastName: 'test1',
        nationality: 'test2',
        image: 'test3',
        birthday: '2000-10-22'
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([directors.id]);
    await directors.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/movies/id/genres debe insertar un genero a la pelicula', async () => {
    const genre = await Genres.create({
        name: 'test'
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('DELETE/movies/:id debe eliminar una movie', async () => {
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204);
});