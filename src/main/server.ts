import express, { type Application } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { PrismaService } from '../infrastructure/database/prisma.service';
import { errorHandler } from '../presentation/middlewares/error-handler.middleware';
import { createRoutes } from '../presentation/routes';
import { makeEmpresaController } from './factories/empresa.factory';
import { makeFuncionarioController } from './factories/funcionario.factory';
import { makeProjetoController } from './factories/projeto.factory';
import { makeUrlController } from './factories/url.factory';
import { env } from './config/env';
import { makeAuthController } from './factories/auth.factory';

export class Server {
  private app: Application;
  private prisma = PrismaService.getInstance();

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  private setupMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    const limiter = rateLimit({
      windowMs: env.rateLimitWindowMs,
      max: env.rateLimitMaxRequests,
      message: 'Muitas requisições deste IP, tente novamente mais tarde.',
    });

    this.app.use('/api', limiter);
  }

  private setupRoutes(): void {
    const authController = makeAuthController(this.prisma);
    const empresaController = makeEmpresaController(this.prisma);
    const funcionarioController = makeFuncionarioController(this.prisma);
    const projetoController = makeProjetoController(this.prisma);
    const urlController = makeUrlController(this.prisma);

    const routes = createRoutes(
      empresaController,
      funcionarioController,
      projetoController,
      urlController,
      authController
    );

    this.app.use('/api', routes);
  }

  private setupErrorHandler(): void {
    this.app.use(errorHandler);
  }

  async start(): Promise<void> {
    try {
      await this.prisma.$connect();
      console.log('Database connected successfully');

      this.app.listen(env.port, () => {
        console.log(`Server running on port ${env.port}`);
        console.log(`Environment: ${env.nodeEnv}`);
        console.log(`API: http://localhost:${env.port}/api`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      await this.shutdown();
      process.exit(1);
    }
  }

  async shutdown(): Promise<void> {
    console.log('Shutting down server...');
    await PrismaService.disconnect();
    console.log('Server shutdown complete');
  }
}
