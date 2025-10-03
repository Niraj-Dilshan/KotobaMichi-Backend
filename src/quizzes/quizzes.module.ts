import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { DrizzleModule } from 'src/db/drizzle.module';
import { ProgressModule } from 'src/progress/progress.module';

@Module({
  imports: [DrizzleModule, ProgressModule],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
