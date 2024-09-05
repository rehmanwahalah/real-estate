import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CommonServices } from '../shared/common.service';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController extends CommonServices {
  constructor(private readonly propertyService: PropertyService) {
    super();
  }

  @Get('')
  async getPropertListings(@Res() res: Response, @Req() req): Promise<any> {
    try {
      const response = await this.propertyService.sharedFind({});
      return this.sendResponse(
        this.messages.Success,
        response ?? 'NOT_FOUND',
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

  /**
   *
   * @param query
   * @param res
   * @param req
   */
  @Get('/listings/dashboard')
  async getDashboardLisings(@Res() res, @Req() req) {
    try {
      const listings = await this.propertyService.propertyRepository
        .find({})
        .sort({ _id: -1 })
        .limit(20);

      this.sendResponse(this.messages.Success, listings, HttpStatus.OK, res);
    } catch (error) {
      console.error('error', error);
      this.sendResponse(
        this.messages.Error,
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }

  /**
   *
   * @param query
   * @param res
   * @param req
   */
  @Get('/listings')
  async getDashboardActiveUsers(@Query() query, @Res() res, @Req() req) {
    try {
      const page = Number(query.page);
      const resPerPage = query.resPerPage ? Number(query.resPerPage) : 20;
      const search = query.search || ''; // Default to empty search if not provided

      console.log(`search =>`, query);

      const listings = await this.propertyService.propertyLisitng(
        page,
        resPerPage,
        search,
      );

      this.sendResponse(this.messages.Success, listings, HttpStatus.OK, res);
    } catch (error) {
      console.error('error', error);
      this.sendResponse(
        this.messages.Error,
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }

  /**
   *
   * @param query
   * @param res
   * @param req
   */
  @Get('/detail')
  async getPropertyDetails(@Query() query, @Res() res, @Req() req) {
    try {
      const id = query.id;

      const property =
        await this.propertyService.propertyRepository.findById(id);

      this.sendResponse(this.messages.Success, property, HttpStatus.OK, res);
    } catch (error) {
      console.error('error', error);
      this.sendResponse(
        this.messages.Error,
        null,
        HttpStatus.INTERNAL_SERVER_ERROR,
        res,
      );
    }
  }
}
