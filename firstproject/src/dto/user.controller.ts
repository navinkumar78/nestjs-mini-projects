import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Get('all')
  getUsers() {
    return 'User1, User2, User3';
  }

  @Post('create')
  createUsers(@Body() body: any) {
    //return `hello im just post reuqests`+body;
    return `hello im just post requests ` + JSON.stringify(body);

  }

}
