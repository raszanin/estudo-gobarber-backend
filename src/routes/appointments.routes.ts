import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedData = parseISO(date);

  const createAppointment = new CreateAppointmentsService();
  const appointment = await createAppointment.execute({
    date: parsedData,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
