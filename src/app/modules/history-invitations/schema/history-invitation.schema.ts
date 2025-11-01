import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type HistoryInvitationDocument = HydratedDocument<HistoryInvitation>;

export interface IHistoryInvitation {
  userId: Types.ObjectId; // ID người dùng được mời
  code: string; // Mã mời đã sử dụng
  invitedAt: Date; // Ngày được mời
  status: string; // Trạng thái lời mời (accepted, pending, declined)
}

@Schema({ collection: 'history-invitations', timestamps: true })
export class HistoryInvitation {
  @Prop({ required: true, type: Types.ObjectId, ref: 'users' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  invitedAt: Date;

  @Prop({ required: true })
  status: string;
}

export const HistoryInvitationSchema =
  SchemaFactory.createForClass(HistoryInvitation);
