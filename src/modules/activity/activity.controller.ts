import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CommonServices } from '../shared/common.service';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PropertyService } from '../property/property.service';

@Controller('activity')
export class ActivityController extends CommonServices {
  constructor(
    private readonly activityService: ActivityService,
    private readonly propertyService: PropertyService,
  ) {
    super();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createActivity(@Body() body: any, @Res() res: Response, @Req() req) {
    try {
      const payload = {
        ...body,
        userId: req.user.userId,
      };
      const activity = await this.activityService.sharedCreate(payload);

      // update views
      if (body.action == 'view')
        await this.propertyService.sharedFindOneAndUpdate(
          { _id: body.propertyId },
          {
            $inc: { views: 1 }, // Increment views and add duration
          },
          {},
        );

      //update duration/ time spend
      if (body.action == 'time_spent')
        await this.propertyService.sharedFindOneAndUpdate(
          { _id: body.propertyId },
          {
            $inc: { total_time_spent: body.duration || 0 }, // Increment views and add duration
          },
          {},
        );

      return this.sendResponse(
        this.messages.Success,
        activity,
        HttpStatus.OK,
        res,
      );
    } catch (error) {
      console.log(error);
      return this.sendResponse(
        'Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }

  @Get('')
  async getActivityListings(@Res() res: Response, @Req() req): Promise<any> {
    try {
      const response = await this.activityService.sharedFind({});
      return this.sendResponse(
        this.messages.Success,
        response,
        HttpStatus.OK,
        res,
      );
    } catch (error) {
      return this.sendResponse(
        'Internal server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }

  // New Update API to modify existing activity
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateActivity(
    @Body() body: any, // should include { userId, propertyId, action, duration (optional) }
    @Res() res: Response,
    @Req() req,
  ) {
    try {
      // Check if the activity exists for the user and property
      const existingActivity = await this.activityService.sharedFindOne({
        userId: body.userId,
        propertyId: body.propertyId,
        action: body.action, // Example: 'click' or 'view'
      });

      if (existingActivity) {
        // If activity exists, update it
        const updatedActivity = await this.activityService.sharedUpdate(
          { _id: existingActivity._id },
          {
            duration: body.duration ? body.duration : existingActivity.duration,
            timestamp: new Date(), // update the timestamp to the latest interaction
          },
        );

        return this.sendResponse(
          this.messages.Success,
          updatedActivity,
          HttpStatus.OK,
          res,
        );
      } else {
        // If no activity exists, return a not found response
        return this.sendResponse(
          'Activity not found',
          {},
          HttpStatus.NOT_FOUND,
          res,
        );
      }
    } catch (error) {
      return this.sendResponse(
        'Internal server Error',
        {},
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }
}
