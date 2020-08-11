import { Request, Response, response } from 'express';
import db from '../database/connections';

import convertHourToMinutes from  '../utils/convertHourToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassController {
  async index (req: Request, res: Response) {
    const filters = req.query;

    if (!filters.week_day || !filters.subject || !filters.time) {
      return res.status(400).json({
        error: 'Missing filters to search classes'
      })
    }    

    const timeInMinutes = convertHourToMinutes(filters.time as string);

    console.log(timeInMinutes);


    /**
     * PENDING: 
     * The search does not return the times between from and to
     */
    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(filters.week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])          
          .whereRaw('`class_schedule`.`to` > ??', [Number(timeInMinutes)])
      })
      .where('classes.subject', '=', filters.subject as string)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return res.json(classes);
  }

  async create (req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
    
    // Transaction Variable    
    const trx = await db.transaction();
  
    try {
      /**
       * PENDENING
       * Validate user exists
       */
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });
    
      const user_id = insertedUsersIds[0];
    
      console.log (user_id);
    
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id
      });
    
      const class_id = insertedClassesIds[0];
    
      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
        }
      })
      
      await trx('class_schedule').insert(classSchedule);
    
      await trx.commit();
    
      return res.status(201).send();
    }
    catch (err) {
      await trx.rollback();
  
      return res.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  }

  /**
   * PENDENING
   */
  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}