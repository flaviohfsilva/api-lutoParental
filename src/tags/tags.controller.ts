import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get('buscarTodas')
  findAll() {
    return this.tagsService.buscarTodasTags();
  }

  @Get('buscarPor/:id')
  findOne(@Param('id') id: string) {
    return this.tagsService.buscarTagPorId(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
  //   return this.tagsService.update(+id, updateTagDto);
  // }

  @Delete('excluir/:id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
