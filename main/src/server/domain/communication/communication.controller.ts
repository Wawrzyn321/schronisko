import { VAdoptionFormFetch, VolunteeringFormFetch } from './common';
import { CommunicationService } from './communication.service';
import { Public } from '../auth/public.decorator';
import { Controller, Post, Query, Body } from '@nestjs/common';

@Public()
@Controller('api/comms')
export class CommunicationController {
  constructor(private communicationService: CommunicationService) {}

  @Post('/captcha')
  getCapcha() {
    return this.communicationService.generateCaptcha();
  }

  @Post('/volunteer')
  sendVolunteering(
    @Query('id') id: string,
    @Query('text') text: string,
    @Body() props: VolunteeringFormFetch,
  ) {
    return this.communicationService.sendVolunteering(id, text, props);
  }

  @Post('/v-adoption')
  sendVAdoption(
    @Query('id') id: string,
    @Query('text') text: string,
    @Body() props: VAdoptionFormFetch,
  ) {
    return this.communicationService.sendVAdoption(id, text, props);
  }
}
