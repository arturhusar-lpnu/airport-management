import { Repository, DataSource } from 'typeorm';
import { Users } from '../entities/Users.entity';
import { AuthCredentialsDto } from '@auth/dtos/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

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
}
