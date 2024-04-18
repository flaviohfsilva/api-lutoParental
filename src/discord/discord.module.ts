import { Module } from '@nestjs/common';
import { DiscordClient } from './discord.client';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [DiscordClient],
  exports: [DiscordClient],
})
export class DiscordModule {}
