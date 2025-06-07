import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  // This class extends CreateTaskDto and makes all its properties optional.
  // It is used to validate the data when updating an existing task.
  // The PartialType utility from @nestjs/mapped-types automatically makes all properties optional.
}   