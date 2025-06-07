import { Controller, Get, Post } from '@nestjs/common';


@Controller("all")
export class UserController {
  constructor() { }
  // hello get servive method
  @Get()
  getUser(): string {
    return 'Hello User!';
   // return this.appService.getHello()
  }

  @Post()
  postUser(): string {
    return 'Hello User from POST!';
    //return this.appService.getHelloPost();
  }
  
}
