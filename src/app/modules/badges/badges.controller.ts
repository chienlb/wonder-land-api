import { Controller, Query, HttpException, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { BadgeType } from './schema/badge.schema';

@ApiTags('Badges')
@ApiBearerAuth()
@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new badge' })
  @ApiBody({ type: CreateBadgeDto, description: 'The badge to create', examples: { example1: { value: { name: 'Badge 1', description: 'Badge 1 description', iconUrl: 'https://example.com/icon.png', type: BadgeType.ACHIEVEMENT, criteria: 'Complete 10 lessons', triggerEvent: 'complete_lesson', requiredValue: 10, givenTo: [], isActive: true, createdBy: '1234567890', updatedBy: '1234567890' } } } })
  @ApiResponse({ status: 201, description: 'The badge has been successfully created.', type: CreateBadgeDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpException })
  async createBadge(@Body() createBadgeDto: CreateBadgeDto): Promise<any> {
    return this.badgesService.createBadge(createBadgeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all badges' })
  @ApiQuery({ name: 'page', type: Number, description: 'The page number', required: false })
  @ApiQuery({ name: 'limit', type: Number, description: 'The number of items per page', required: false })
  @ApiResponse({
    status: 200,
    description: 'The badges have been successfully retrieved.',
    schema: {
      type: 'object',
      properties: {
        badges: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              iconUrl: { type: 'string' },
              type: { type: 'string' },
              criteria: { type: 'string' },
              triggerEvent: { type: 'string' },
              requiredValue: { type: 'number' },
              givenTo: {
                type: 'array',
                items: { type: 'string' }
              },
              isActive: { type: 'boolean' },
              createdBy: { type: 'string' },
              updatedBy: { type: 'string' }
            }
          }
        },
        total: { type: 'number' },
        totalPages: { type: 'number' },
        currentPage: { type: 'number' },
        hasNextPage: { type: 'boolean' },
        hasPreviousPage: { type: 'boolean' },
        nextPage: { type: 'number' },
        previousPage: { type: 'number' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpException })
  async findAllBadges(@Query() query: any): Promise<any> {
    return this.badgesService.findAllBadges(query.page, query.limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a badge by id' })
  @ApiParam({ name: 'id', type: String, description: 'The id of the badge' })
  @ApiResponse({ status: 200, description: 'The badge has been successfully retrieved.', type: CreateBadgeDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpException })
  async findBadgeById(@Param('id') id: string): Promise<any> {
    return this.badgesService.findBadgeById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a badge by id' })
  @ApiBody({ type: UpdateBadgeDto, description: 'The badge to update', examples: { example1: { value: { name: 'Badge 1', description: 'Badge 1 description', iconUrl: 'https://example.com/icon.png', type: BadgeType.ACHIEVEMENT, criteria: 'Complete 10 lessons', triggerEvent: 'complete_lesson', requiredValue: 10, givenTo: [], isActive: true, createdBy: '1234567890', updatedBy: '1234567890' } } } })
  @ApiResponse({ status: 200, description: 'The badge has been successfully updated.', type: UpdateBadgeDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpException })
  async updateBadgeById(@Param('id') id: string, @Body() updateBadgeDto: UpdateBadgeDto): Promise<any> {
    return this.badgesService.updateBadgeById(id, updateBadgeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a badge by id' })
  @ApiParam({ name: 'id', type: String, description: 'The id of the badge' })
  @ApiResponse({ status: 200, description: 'The badge has been successfully deleted.', type: CreateBadgeDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpException })
  async deleteBadgeById(@Param('id') id: string): Promise<any> {
    return this.badgesService.deleteBadgeById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Restore a badge by id' })
  @ApiParam({ name: 'id', type: String, description: 'The id of the badge' })
  @ApiResponse({ status: 200, description: 'The badge has been successfully restored.', type: CreateBadgeDto })
  @ApiResponse({ status: 400, description: 'Bad Request', type: HttpException })
  async restoreBadgeById(@Param('id') id: string): Promise<any> {
    return this.badgesService.restoreBadgeById(id);
  }
}