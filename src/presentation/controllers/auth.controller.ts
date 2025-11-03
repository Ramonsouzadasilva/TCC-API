import type { Request, Response, NextFunction } from 'express';
import type { LoginUseCase } from '../../application/use-cases/auth/login.use-case';

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.loginUseCase.execute(req.body);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
