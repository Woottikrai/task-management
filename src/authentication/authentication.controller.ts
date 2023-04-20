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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/authentication/dto/login.dto';
import { AuthGuard } from './auth.guard';
import { GetUser } from './get-user.decorator';
import { User } from 'src/entities/user.entity';

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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@GetUser() user) {
    return await this.authenticationService.getUser(user.sub);
  }
}
