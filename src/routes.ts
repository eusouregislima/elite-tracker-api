import { Router } from 'express';

import packageJson from '../package.json';
import { FocusTimerController } from './controllers/focus-time.controller';
import { HabitsController } from './controllers/habits.controller';

export const routes = Router();

const habitsController = new HabitsController();
const focusTimerController = new FocusTimerController();

routes.get('/', (request, response) => {
  const { name, description, version } = packageJson;

  return response.status(200).json({ name, description, version });
});

routes.get('/habits', habitsController.index);
routes.post('/habits', habitsController.store);
routes.delete('/habits/:id', habitsController.remove);
routes.patch('/habits/:id/toggle', habitsController.toggle);

routes.post('/focus-time', focusTimerController.store);
