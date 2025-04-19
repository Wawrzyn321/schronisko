import { VAdoptionFormFetch, VolunteeringFormFetch } from './common';
import { CommunicationService } from './communication.service';
import { Public } from '../auth/decorators/public.decorator';
import { Controller, Post, Query, Body } from '@nestjs/common';

@Public()
@Controller('api/comms')
export class CommunicationController {
  constructor(private communicationService: CommunicationService) {}

  @Post('/volunteer')
  sendVolunteering(@Body() props: VolunteeringFormFetch) {
    return this.communicationService.sendVolunteering(props);
  }

  @Post('/v-adoption')
  sendVAdoption(@Body() props: VAdoptionFormFetch) {
    return this.communicationService.sendVAdoption(props);
  }
}
