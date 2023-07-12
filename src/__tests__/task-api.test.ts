import { ApiMessageEnum } from '../api/models';
import { createTodoTask } from '../stubs/task.stub';
import request from 'supertest';
import { app } from '../server';

describe('[Task] API', () => {

  it('GET /task should list all tasks', async () => {
    const task = await createTodoTask();
    await request(app)
      .get('/awesome/applicant/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe(ApiMessageEnum.OK);
        expect(response.body.data[0].fullName).toEqual(task.fullName);
        expect(response.body.statusCode).toEqual(200);
      });
  });

  it('GET /task/:id, should return success', async () => {
    const task = await createTodoTask();
    await request(app)
      .get(`/awesome/applicant/${task.uuid}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toBeDefined();
        expect(response.body.message).toBe(ApiMessageEnum.OK);
        expect(response.body.data.fullName).toEqual(task.fullName);
        expect(response.body.statusCode).toEqual(200);
      })
      .catch((err) => expect(err).toBeUndefined());
  });

  it('[POST] /task, creates a new task', async () => {
    const task = await createTodoTask(false);
    await request(app)
      .post('/awesome/applicant/')
      .set('accept', 'json')
      .send(task)
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.data.fullName).toEqual(task.fullName);
        expect(res.body.message).toBe(ApiMessageEnum.OK);
      })
      .catch((err) => expect(err).toBeUndefined());
  });

  it('[PUT] /task, updates a task', async () => {
    const task = await createTodoTask();
    await request(app)
      .put(`/awesome/applicant/${task.uuid}`)
      .set('accept', 'json')
      .send({ fullName: 'fullName updated' })
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.message).toBe(ApiMessageEnum.OK);
        expect(res.body.data.fullName).toEqual('fullName updated');
      })
      .catch((err) => expect(err).toBeUndefined());
  });

  it('[DELETE] /task, deletes a task', async () => {
    const task = await createTodoTask();
    await request(app)
      .delete(`/awesome/applicant/${task.uuid}`)
      .set('accept', 'json')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeDefined();
        expect(res.body.message).toEqual(ApiMessageEnum.OK);
      })
      .catch((err) => expect(err).toBeUndefined());
  });
});
