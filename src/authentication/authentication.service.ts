import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async siginin(email: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    const compare = await bcrypt.compare(pass, user?.password);
    console.log({ userpass: user.password, enterpass: pass, compare: compare });

    if (!compare) {
      throw new UnauthorizedException();
    }

    const payload = { email: user?.email, sub: user?.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
