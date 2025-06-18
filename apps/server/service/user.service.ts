import { User, LoginRequest, RegisterRequest } from '../types/user';
import { UserMapper } from '../mapper/user.mapper';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  private userMapper: UserMapper;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  constructor() {
    this.userMapper = new UserMapper();
  }

  async register(data: RegisterRequest): Promise<Omit<User, 'password'>> {
    // Check if username already exists
    const existingUser = await this.userMapper.findByUsername(data.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.userMapper.findByEmail(data.email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await this.userMapper.create({
      username: data.username,
      password: hashedPassword,
      email: data.email,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async login(data: LoginRequest): Promise<{ token: string; user: Omit<User, 'password'> }> {
    // Find user by username
    const user = await this.userMapper.findByUsername(data.username);
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid username or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      this.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }
} 