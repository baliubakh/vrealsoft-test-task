import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async googleLogin(token: string) {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Invalid Google token');
    }

    const { email, name, picture, sub: googleId } = payload;

    let user = await this.userRepository.findOne({ where: { googleId } });

    if (!user) {
      user = this.userRepository.create({
        email,
        name,
        picture,
        googleId,
      });
      await this.userRepository.save(user);
    }

    const jwtToken = this.jwtService.sign({ email, sub: user.id });

    return { user, token: jwtToken };
  }
}
