import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { RegisteredUserDto } from '@modules/users/dto/registered-user.dto';
import { UserDto } from '@modules/users/dto/user.dto';
import { GlobalFilter } from '@src/lib/global.filter';

@UseFilters(new GlobalFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/detail/:id')
  private async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post('/sign-in')
  private async signIn(@Body() user: RegisteredUserDto): Promise<UserDto> {
    return this.userService.setUser(user);
  }
}
