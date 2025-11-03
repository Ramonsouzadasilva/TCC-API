import { Router } from 'express';
import type { FuncionarioController } from '../controllers/funcionario.controller';
import { validateBody } from '../middlewares/validation.middleware';
import {
  CreateFuncionarioDtoSchema,
  UpdateFuncionarioDtoSchema,
} from '../../application/dtos/funcionario.dto';
import { authMiddleware } from '../middlewares/auth.middleware';
import { managerMiddleware } from '../middlewares/manager.middleware';

export const createFuncionarioRoutes = (
  funcionarioController: FuncionarioController
) => {
  const router = Router();

  router.post(
    '/',
    // authMiddleware,
    // managerMiddleware,
    validateBody(CreateFuncionarioDtoSchema),
    funcionarioController.create
  );
  router.get('/', authMiddleware, funcionarioController.list);
  router.get('/:id', authMiddleware, funcionarioController.getById);
  router.put(
    '/:id',
    authMiddleware,
    managerMiddleware,
    validateBody(UpdateFuncionarioDtoSchema),
    funcionarioController.update
  );
  router.delete(
    '/:id',
    authMiddleware,
    managerMiddleware,
    funcionarioController.delete
  );

  return router;
};
