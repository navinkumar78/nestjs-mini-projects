//import {isIn,isNotEmpty} from 'class-validator';
import { IsIn, IsNotEmpty } from 'class-validator';


export class CreateTaskDto {

    @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsIn(['todo', 'in-progress', 'done'])
  status: string;


}
// This DTO is used to validate the data when creating a new task.
// The `isNotEmpty` decorator ensures that the field is not empt