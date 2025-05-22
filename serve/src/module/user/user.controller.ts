import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/addUser')
  create(@Query() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/findAllUser')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/findUserById/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post('/updateUser')
  update(@Body() params: UpdateUserDto & { id: string }) {
    const { id, username, email, password, avatar } = params;
    return this.userService.update(+id, {
      username,
      email,
      password,
      avatar,
    });
  }
}
