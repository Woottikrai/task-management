import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login.dto';
import { AuthGuard } from './auth.guard';

@ApiTags('login')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('siginin')
  async logIn(@Body() bodyLogin: LoginDto) {
    const { email, password } = bodyLogin;
    return await this.authenticationService.siginin(email, password);
  }
}
