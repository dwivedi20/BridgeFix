import { PartialType  } from '@nestjs/swagger';
import { CreateLeaveDTO } from "./create_leave.dto";

export class UpdateLeaveDTO extends PartialType(CreateLeaveDTO){}