import { Repository, DataSource } from 'typeorm';
import { Users } from '../entities/Users.entity';
import { AuthCredentialsDto } from '@auth/dtos/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRoles } from '../user_role.enum';
import { JwtPayload } from 'src/auth/jwt/jwt-payload.interface';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.create({
      username: username,
      email: email,
      passwordHash: hashedPassword,
    });

    await this.save(newUser);
  }

  public async getPassengerById(id: number) {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Passenger with id : ${id} not found`);
    }

    const hasPassengerRole = found.roles.filter(
      (r) => r.name == UserRoles.Passenger,
    );

    if (hasPassengerRole.length == 0) {
      throw new UnauthorizedException('User is not a passenger');
    }

    return found;
  }

  public async getPassenger(user: JwtPayload) {
    const found = await this.findOne({ where: { email: user.email } });

    if (!found) {
      throw new NotFoundException(`Passenger not found`);
    }

    const hasPassengerRole = user.roles.filter((r) => r == UserRoles.Passenger);

    if (hasPassengerRole.length == 0) {
      throw new UnauthorizedException('User is not a passenger');
    }

    return found;
  }
}
