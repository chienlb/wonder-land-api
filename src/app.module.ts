import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/modules/users/users.module';
import { TokensModule } from './app/modules/tokens/tokens.module';
import { ProvincesModule } from './app/modules/provinces/provinces.module';
import { DistrictsModule } from './app/modules/districts/districts.module';
import { SchoolsModule } from './app/modules/schools/schools.module';
import { ClassesModule } from './app/modules/classes/classes.module';
import { GroupsModule } from './app/modules/groups/groups.module';
import { UnitsModule } from './app/modules/units/units.module';
import { LessonsModule } from './app/modules/lessons/lessons.module';
import { InvitationCodesModule } from './app/modules/invitation-codes/invitation-codes.module';
import { HistoryInvitationsNoSpecModule } from './app/modules/history-invitations--no-spec/history-invitations--no-spec.module';
import { HistoryInvitationsModule } from './app/modules/history-invitations/history-invitations.module';

@Module({
  imports: [
    UsersModule,
    TokensModule,
    ProvincesModule,
    DistrictsModule,
    SchoolsModule,
    ClassesModule,
    GroupsModule,
    UnitsModule,
    LessonsModule,
    InvitationCodesModule,
    HistoryInvitationsNoSpecModule,
    HistoryInvitationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
