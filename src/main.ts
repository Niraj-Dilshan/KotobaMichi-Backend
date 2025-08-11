import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const logger = new Logger('Bootstrap');

	try {
		const app = await NestFactory.create(AppModule, {
			logger: ['error', 'warn', 'log', 'debug', 'verbose'],
		});

		// Enable CORS
		app.enableCors();
		logger.log('CORS enabled');

		// Global validation pipe
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true,
			})
		);
		logger.log('Global validation pipe configured');

		// Global prefix for API routes
		app.setGlobalPrefix('v1/');
		logger.log('Global API prefix set to: v1/');

		const port = process.env['PORT'] || 3000;
		await app.listen(port);
		logger.log(`Application is running on: http://localhost:${port}`);
	} catch (error) {
		logger.error(
			'Failed to start application',
			error instanceof Error ? error.stack : String(error)
		);
		throw error;
	}
}
bootstrap();
