import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsIn(['fiction', 'non-fiction', 'mystery', 'romance', 'sci-fi', 'biography'])
  genre: 'fiction' | 'non-fiction' | 'mystery' | 'romance' | 'sci-fi' | 'biography';

  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publicationYear: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsNotEmpty()
  stock: number;

}
