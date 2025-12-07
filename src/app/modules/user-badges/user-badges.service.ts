import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserBadge, UserBadgeDocument } from './schema/user-badge.schema';
import { CreateUserBadgeDto } from './dto/create-user-badge.dto';
import { UsersService } from '../users/users.service';
import { BadgesService } from '../badges/badges.service';
import { UpdateUserBadgeDto } from './dto/update-user-badge.dto';


@Injectable()
export class UserBadgesService {
  constructor(
    @InjectModel(UserBadge.name) private userBadgeModel: Model<UserBadgeDocument>,
    private usersService: UsersService,
    private badgesService: BadgesService,
  ) { }

  async createUserBadge(createUserBadgeDto: CreateUserBadgeDto): Promise<UserBadgeDocument> {
    try {
      const user = await this.usersService.findUserById(createUserBadgeDto.userId);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const badge = await this.badgesService.findBadgeById(createUserBadgeDto.badgeId);
      if (!badge) {
        throw new BadRequestException('Badge not found');
      }
      const userBadge = new this.userBadgeModel(createUserBadgeDto);
      return await userBadge.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUserBadgeById(id: string): Promise<UserBadgeDocument> {
    try {
      const userBadge = await this.userBadgeModel.findById(id);
      if (!userBadge) {
        throw new BadRequestException('User badge not found');
      }
      return userBadge;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllUserBadges(
    page: number,
    limit: number,
  ): Promise<{
    userBadges: UserBadgeDocument[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
  }> {
    try {
      const sort = { createdAt: 'desc' } as const;
      const skip = (page - 1) * limit;
      const userBadges = await this.userBadgeModel.find()
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .exec();
      const total = await this.userBadgeModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
      const currentPage = page;
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;
      return {
        userBadges,
        total,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUserBadge(id: string, updateUserBadgeDto: UpdateUserBadgeDto): Promise<UserBadgeDocument> {
    try {
      const userBadge = await this.userBadgeModel.findByIdAndUpdate(id, updateUserBadgeDto, { new: true });
      if (!userBadge) {
        throw new BadRequestException('User badge not found');
      }
      return userBadge;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteUserBadge(id: string): Promise<void> {
    try {
      const userBadge = await this.userBadgeModel.findByIdAndDelete(id);
      if (!userBadge) {
        throw new BadRequestException('User badge not found');
      }
    } catch (error) {
      throw new BadRequestException('Failed to delete user badge', error);
    }
  }

  async revokeUserBadge(id: string): Promise<void> {
    try {
      const userBadge = await this.userBadgeModel.findByIdAndUpdate(id, { isRevoked: true }, { new: true });
      if (!userBadge) {
        throw new BadRequestException('User badge not found');
      }
    } catch (error) {
      throw new BadRequestException('Failed to revoke user badge', error);
    }
  }

  async restoreUserBadge(id: string): Promise<void> {
    try {
      const userBadge = await this.userBadgeModel.findByIdAndUpdate(id, { isRevoked: false }, { new: true });
      if (!userBadge) {
        throw new BadRequestException('User badge not found');
      }
    } catch (error) {
      throw new BadRequestException('Failed to restore user badge', error);
    }
  }

  async findUserBadgesByUserId(userId: string, page: number, limit: number): Promise<{
    userBadges: UserBadgeDocument[];
    total: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
  }> {
    try {
      const skip = (page - 1) * limit;
      const userBadges = await this.userBadgeModel.find({ userId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 'desc' })
        .exec();
      const total = await this.userBadgeModel.countDocuments({ userId });
      const totalPages = Math.ceil(total / limit);
      const currentPage = page;
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const previousPage = hasPreviousPage ? page - 1 : null;
      return {
        userBadges,
        total,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
        nextPage,
        previousPage,
      };
    } catch (error) {
      throw new BadRequestException('Failed to find user badges', error);
    }
  }
}