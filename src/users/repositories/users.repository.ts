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

  public async getPassenger(userId: number) {
    const found = await this.findOne({ where: { id: userId } });

    if (!found) {
      throw new NotFoundException(`Passenger with id : ${userId} not found`);
    }

    const hasPassengerRole = found.roles.filter(
      (r) => r.name == UserRoles.Passenger,
    );

    if (hasPassengerRole.length == 0) {
      throw new UnauthorizedException('User is not a passenger');
    }

    return found;
  }
}
