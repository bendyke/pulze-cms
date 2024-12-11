import User, { IUser, IUserDocument } from '../models/User.model';

export class UserService {
  async createUser(userData: Partial<IUser>): Promise<IUserDocument> {
    const user = new User(userData);
    return await user.save();
  }

  async getUserById(id: string): Promise<IUserDocument | null> {
    return await User.findById(id);
  }

  async getAllUsers(): Promise<IUserDocument[]> {
    return await User.find();
  }

  async updateUser(
    id: string,
    userData: Partial<IUser>
  ): Promise<IUserDocument | null> {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  async deleteUser(id: string): Promise<IUserDocument | null> {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserService();
