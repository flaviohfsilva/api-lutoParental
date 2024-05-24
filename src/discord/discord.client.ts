import { CreateDiscordDto } from './dto/create-discord.dto';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class DiscordClient {
  private readonly logger: Logger = new Logger(DiscordClient.name);
  constructor(private readonly httpService: HttpService) {}

  enviarDepoimento(createDtoDiscord: CreateDiscordDto): void {
    this.logger.log('Objeto cheagado no discord client', createDtoDiscord);
    const { id, titulo, texto, img, genero, nome } = createDtoDiscord;
    firstValueFrom(
      this.httpService
        .post(
          'https://discord.com/api/webhooks/1228489126303633418/BBZBCwrVFBps-zmVWWk01a4jDZ153MSY099VR1a1sVB1qpmNOs7Ub3TidKaL-1xhJTOr',
          {
            content: `Nova história realizada! http://localhost:3002/depoimentos/validacao/${id}`,
            embeds: [
              {
                title: titulo,
                description: texto,
                image: {
                  url: img,
                },
                fields: [
                  {
                    name: 'Nome',
                    value: nome,
                    inline: true,
                  },
                  {
                    name: 'Genero',
                    value: genero,
                    inline: true,
                  },
                ],

                footer: {
                  text: 'Caso a história não siga as nossas diretizes, aperte no botão abaixo',
                  inline: true,
                },
              },
            ],
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(
              `Falha ao enviar história: ${error.response.data}`,
            );
            throw new BadRequestException();
          }),
        ),
    );
  }
}
