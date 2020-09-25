const request = require('supertest');
const app = require('../../src/app');
// const Reminder = require('../../src/models/reminder')

describe('Reminders Tests', () => {

  // afterAll(async () => {
  //   await Reminder.remove({});
  // })

  /******TESTE PARA CRIAR LEMBRETE******/    
  it('POST/Criar novo lembrete.', async () => {
    const response = await request(app)
      .post('/reminder')
      .send({
        description: "Descrição de Tarefa Exemplo",
        dateActivity: "2020-09-04T09:00:00",
        dayWeek: [2,3,4]
      });
      expect(response.body).toHaveProperty('_id'); 
      expect(response.statusCode).toEqual(200);
      // console.log(response.body);
  });

  /******TESTE PARA EDITAR LEMBRETE******/    
  it('PUT/Editar lembrete.', async () => {
    const response = await request(app)
    .post('/auth')
    .set('Content-Type', 'application/json')
    .send({
        email: "teste@gmail.com",
        password: "12345678"
    });
    expect(response.body).toHaveProperty('token'); 
    const token = response.body.token;

    const reminder = await request(app)
    .post('/reminder')
    .send({
      description: "Descrição de Tarefa Exemplo Update",
      dateActivity: "2020-09-04T09:00:00",
      dayWeek: [2,3,4]
    });
    expect(reminder.body).toHaveProperty('_id');
    expect(reminder.statusCode).toEqual(200);
    console.table(reminder.body);

    const reminderId = reminder.body._id;
    
    const up = await request(app)
      .put(`/reminder/${reminderId}`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: "Descrição de Tarefa Exemplo Update Feito",
        status: true,
        repeat: false,
        dateActivity: "2020-09-04T02:30:00",
        dayWeek: [1,2,3]
      });

      expect(up.statusCode).toEqual(200);
      console.table(up.body.reminder);
  });

  /******TESTE PARA DELETAR LEMBRETE******/    
  it('DELETE/Deleta lembrete por id.', async () => {
    const auth = await request(app)
      .post('/auth')
      .set('Content-Type', 'application/json')
      .send({
          email: "teste@gmail.com",
          password: "12345678"
      });
      expect(auth.body).toHaveProperty('token');

      const token = auth.body.token;

      const reminder = await request(app)
      .post('/reminder')
      .send({
        description: "Descrição de Tarefa Exemplo de Delete",
        dateActivity: "2020-09-04T09:00:00",
        dayWeek: [2,3,4]
      });
      expect(reminder.body).toHaveProperty('_id');
      // console.log(reminder.body);

      const reminderId = reminder.body._id;

      const response = await request(app)
      .del(`/reminder/${reminderId}`)
      .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toEqual(200);
      // console.log(response.body);

      const feedback = await request(app)
      .get(`/reminder/${reminderId}`)
      .set('Authorization', `Bearer ${token}`);

      expect(feedback.body).toEqual({"reminder":null})
    });
    
    /******TESTE DE LISTAR LEMBRETES******/    
    it('GET/Listar lembretes.', async () => {
      const response = await request(app).get('/reminders');
        
      expect(response.statusCode).toEqual(200);
    });
  
    /******TESTE DE BUSCA DE LEMBRETE******/    
    it('GET/Buscar lembrete por id.', async () => {
      const auth = await request(app)
        .post('/auth')
        .set('Content-Type', 'application/json')
        .send({
            email: "teste@gmail.com",
            password: "12345678"
        });
        expect(auth.body).toHaveProperty('token');
        expect(auth.statusCode).toEqual(200);
  
        const token = auth.body.token;
  
        const reminder = await request(app)
      .post('/reminder')
      .send({
        description: "Descrição de Tarefa Exemplo de Busca",
        dateActivity: "2020-09-04T09:00:00",
        dayWeek: [2,3,4]
      });
        expect(reminder.body).toHaveProperty('_id');
  
        const reminderId = reminder.body._id;
  
        const response = await request(app)
        .get(`/reminder/${reminderId}`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.statusCode).toEqual(200);
    });
});

  // it('Edita lembrete.', async () => {
  //   // const reminder = await request(app)
  //   // .post('/reminder')
  //   // .send({
  //   //   description: "Descrição de Tarefa Exemplo",
  //   //   dateActivity: "2020-09-04T09:00:00",
  //   //   dayWeek: [2,3,4]
  //   // });

  //   const reminderId = '5f641dab3c3c8b1d6433f0af';

  //   const response = await request(app)
  //     .put(`/reminder/${reminderId}`)
  //     .set('Content-Type', 'application/json')
  //     .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWMwMzNlNmFhZDY2NzM3NDQyMDgzYyIsImlhdCI6MTYwMDM5NTY3OSwiZXhwIjoxNjAwNDgyMDc5fQ.BOWjMNFy_8I1OQDBDPsUqJZHf4Ly_dx5DWTHyCzFejI`)
  //     .send({
  //       description: "Descrição do Projeto Exemplo 02",
  //       status: true,
  //       repeat: false,
  //       dateActivity: "2020-09-04T02:30:00",
  //       dayWeek: [1,2,3]
  //     });
      
  //     console.log(response.body);  
  // });
