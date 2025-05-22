import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 对密码进行加密
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // 创建新用户时使用加密后的密码
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }

  // 验证密码的方法
  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // 如果更新包含密码，需要重新加密
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }
    const result = await this.userRepository.update(id, updateUserDto);

    if (result.affected > 0) {
      return {
        code: 200,
        message: '更新成功',
      };
    } else {
      return {
        code: 400,
        message: '更新失败',
      };
    }
  }

  async delete(params: { email: string; password: string }) {
    const user = await this.userRepository.findOneBy({ email: params.email });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 验证密码
    const isPasswordValid = await this.validatePassword(
      params.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('密码错误');
    }

    const result = await this.userRepository.delete(+user.id);

    if (result.affected > 0) {
      return {
        code: 200,
        message: '删除成功',
      };
    } else {
      return {
        code: 400,
        message: '删除失败',
      };
    }
  }
}
