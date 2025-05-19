import { CommunicationService } from './communication.service';
import { Public } from '../auth/decorators/public.decorator';
import { Controller, Post, Body } from '@nestjs/common';
import { VAdoptionFormData, VolunteeringFormData } from './validation';

@Public()
@Controller('api/comms')
export class CommunicationController {
  constructor(private communicationService: CommunicationService) {}

  @Post('/volunteer')
  sendVolunteering(@Body() props: VolunteeringFormData) {
    return this.communicationService.sendVolunteering(props);
  }

  @Post('/v-adoption')
  sendVAdoption(@Body() props: VAdoptionFormData) {
    return this.communicationService.sendVAdoption(props);
  }
}
