import { Controller } from '@nestjs/common';
import { GroupsService } from './groups.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupType, GroupVisibility } from './schema/group.schema';
import { Body, Param, Post, Query, Put, Delete, Get } from '@nestjs/common';
import { UpdateGroupDto } from './dto/update-group.dto';

@ApiTags('Groups')
@ApiBearerAuth()
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiBody({
    type: CreateGroupDto,
    description: 'The group to create',
    examples: {
      normal: {
        summary: 'Example of a normal group',
        value: {
          groupName: 'Group 1',
          description: 'Group 1 description',
          slug: 'group-1',
          type: GroupType.CLASS,
          visibility: GroupVisibility.PUBLIC,
          owner: '1234567890',
          members: ['1234567890'],
          school: '1234567890',
          classRef: '1234567890',
          subject: 'Subject 1',
          maxMembers: 10,
          isActive: true,
          joinCode: '1234567890',
          avatar: 'Avatar 1',
          background: 'Background 1',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Group created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a group by id' })
  @ApiParam({ name: 'id', description: 'The id of the group', type: String })
  @ApiResponse({ status: 200, description: 'Group found successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findGroupById(@Param('id') id: string) {
    return this.groupsService.findGroupById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiQuery({ name: 'page', description: 'The page number', type: Number })
  @ApiQuery({
    name: 'limit',
    description: 'The number of groups per page',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Groups found successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  findAllGroups(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.groupsService.findAllGroups(page, limit);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a group by id' })
  @ApiParam({ name: 'id', description: 'The id of the group', type: String })
  @ApiBody({
    type: UpdateGroupDto,
    description: 'The group to update',
    examples: {
      normal: {
        summary: 'Example of a normal group',
        value: {
          groupName: 'Group 1',
          description: 'Group 1 description',
          slug: 'group-1',
          type: GroupType.CLASS,
          visibility: GroupVisibility.PUBLIC,
          owner: '1234567890',
          members: ['1234567890'],
          school: '1234567890',
          classRef: '1234567890',
          subject: 'Subject 1',
          maxMembers: 10,
          isActive: true,
          joinCode: '1234567890',
          avatar: 'Avatar 1',
          background: 'Background 1',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Group updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  updateGroup(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.updateGroup(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a group by id' })
  @ApiParam({ name: 'id', description: 'The id of the group', type: String })
  @ApiResponse({ status: 200, description: 'Group deleted successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  deleteGroup(@Param('id') id: string) {
    return this.groupsService.deleteGroup(id);
  }

  @Post(':groupId/join')
  @ApiOperation({ summary: 'Join a group' })
  @ApiParam({
    name: 'groupId',
    description: 'The id of the group',
    type: String,
  })
  @ApiParam({ name: 'userId', description: 'The id of the user', type: String })
  @ApiResponse({ status: 200, description: 'User joined group successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  joinGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.joinGroup(groupId, userId);
  }

  @Post(':groupId/leave')
  @ApiOperation({ summary: 'Leave a group' })
  @ApiParam({
    name: 'groupId',
    description: 'The id of the group',
    type: String,
  })
  @ApiParam({ name: 'userId', description: 'The id of the user', type: String })
  @ApiResponse({ status: 200, description: 'User left group successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  leaveGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupsService.leaveGroup(groupId, userId);
  }

  @Post(':groupId/restore')
  @ApiOperation({ summary: 'Restore a group' })
  @ApiParam({
    name: 'groupId',
    description: 'The id of the group',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Group restored successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  restoreGroup(@Param('groupId') groupId: string) {
    return this.groupsService.restoreGroup(groupId);
  }

  @Post(':groupId/change-visibility')
  @ApiOperation({ summary: 'Change the visibility of a group' })
  @ApiParam({
    name: 'groupId',
    description: 'The id of the group',
    type: String,
  })
  @ApiParam({
    name: 'visibility',
    description: 'The visibility of the group',
    type: String,
    enum: GroupVisibility,
  })
  @ApiResponse({
    status: 200,
    description: 'Group visibility changed successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  changeGroupVisibility(
    @Param('groupId') groupId: string,
    @Param('visibility') visibility: GroupVisibility,
  ) {
    return this.groupsService.changeGroupVisibility(groupId, visibility);
  }
}
