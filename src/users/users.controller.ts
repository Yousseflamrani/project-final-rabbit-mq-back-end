import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(LocalAuthGuard)
    @Get(':email')
    async findOne(@Param('email') email: string) {
        return this.usersService.findOne(email);
    }
}
