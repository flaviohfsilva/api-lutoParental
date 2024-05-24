import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { newsletterProviders } from './newsletter.providers';
import { DatabaseModule } from 'src/core/database/database.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { VerificacaoModule } from 'src/verificacao/verificacao.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    VerificacaoModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      template: {
        dir: join(__dirname, './templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [NewsletterController],
  providers: [NewsletterService, ...newsletterProviders],
})
export class NewsletterModule {}
