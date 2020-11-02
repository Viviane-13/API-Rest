import knex from '../database/connection'
import {Request, Response} from 'express'

class InscController{
  async index (request: Request, response: Response) {
    const insc_events = await knex('insc_event').select('*');
  
    const serializedInsc = insc_events.map(insc_events =>{
      return{
        name: insc_events.name,
        email: insc_events.email,
        dt_nasc: insc_events.dt_nasc
      }
    })
  
    return response.json(serializedInsc);
  }

  async create(request: Request, response: Response) {
    const{
      name,
      email,
      dt_nasc,
      event
    } = request.body;
  
    const trx = await knex.transaction();
  
  const insc = {
    name,
    email,
    dt_nasc
 }
  
   const insertedIds = await trx('insc_event').insert(insc);
  
   const insc_id = insertedIds[0];
  
   const inscEvent = event.map((event_id: number) =>{
     return{
       event_id,
       insc_id
     }
   });
  
   await trx('event_users').insert(inscEvent);
   await trx.commit();
  
   return response.json({
     id: insc_id,
    ...insc
   });
  
  }
}

export default InscController;