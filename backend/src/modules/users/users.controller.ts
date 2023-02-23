import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {RegisteredUserDto} from "../../dtos/user/registered-user.dto";
import {UserDto} from "../../dtos/user/user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get('/detail/:id')
    private async getUser(@Param('id') id: string): Promise<UserDto>{
        return this.userService.findById(id)
    }

    @Post('/sign-in')
    private async signIn(@Body() user: RegisteredUserDto): Promise<boolean> {
        return this.userService.setUser(user)
    }
}
