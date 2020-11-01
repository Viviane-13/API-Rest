import express, { request, response } from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.post('/events', async (request, response)=>{
  const {
    name,
    description,
    dt_init,
    dt_fin,
    qtd_vgs
  } = request.body;

  await knex('events').insert({
    name,
    description,
    dt_init,
    dt_fin,
    qtd_vgs
  });
  
  return response.json({success: true});
})

routes.get('/events',async (request, response) =>{
  const events = await knex('events').select('*');
  return response.json(events);
});


routes.post('/insc_event', async(request, response) =>{
  const {
    evento,
    name,
    email,
    dt_nasc
  } = request.body;

  const ids = await knex('insc_event').insert({
    name,
    email,
    dt_nasc
  })
  const eventoUser = evento.map((event_id: number)=>{
    return{
      event_id,
      insc_id: ids[0],
    }
  })

  await knex('event_users').insert(eventoUser);
   return response.json({success: true})
})


export default routes;