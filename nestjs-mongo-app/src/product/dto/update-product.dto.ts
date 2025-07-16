import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  category?: string;

  @IsOptional()
  productId?: string;
}
