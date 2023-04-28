import { PartialType } from '@nestjs/swagger';
import { CreateBoyDto } from './create-boy.dto';

export class UpdateBoyDto extends PartialType(CreateBoyDto) {}
