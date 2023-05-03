import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { RegisteredUserDto } from '@modules/users/dto/registered-user.dto';
import { UserDto } from '@modules/users/dto/user.dto';
import { GlobalFilter } from '@src/lib/global.filter';
import {ApiTags} from "@nestjs/swagger";

@UseFilters(new GlobalFilter())
@Controller('users')
@ApiTags('회원 관련 API')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/detail/:id')
  private async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('/sign-in')
  private async signIn(@Body() user: RegisteredUserDto): Promise<UserDto> {
    const { id, name, email } = user;
    return this.userService.signIn(id, name, email);
  }
}
