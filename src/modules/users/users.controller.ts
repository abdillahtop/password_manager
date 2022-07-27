import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WrapperHelper } from 'src/helpers/wrapper.helper';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';
import { ApiQuery, ApiTags, ApiHeader, ApiParam, ApiBody } from '@nestjs/swagger';
import { getUsersDTO, getUserDTO, InsertUserDTO, InsertPasswordDTO } from './swagger/users.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiQuery({ type: getUsersDTO })
    async getUsers(@Req() req: Request, @Res() res: Response) {
        try {
            const reqQuery = req['query'];
            const validate = await UsersModel.validateGetUsers(reqQuery);
            if (validate.error) throw validate.error

            const response = await this.usersService.getUsers(reqQuery);
            return res
                .status(200)
                .send(
                    WrapperHelper.successResponse(
                        200,
                        'Get Users Success',
                        response['data'],
                        response['pagination'],
                    ),
                );
        } catch (error) {
            return res
                .status(500)
                .send(WrapperHelper.errorResponse(500, 'Get Users Error', {}, error));
        }
    }

    @Get('/:username')
    @ApiParam({
        name: 'username',
        required: true,
        description: 'put from list',
        type: String
    })
    async getUser(@Req() req: Request, @Res() res: Response) {
        try {
            const requestParams = req['params']['username'];
            if (!requestParams) {
                throw 'params must required';
            }

            const response = await this.usersService.getUser({
                username: requestParams,
            });
            return res
                .status(200)
                .send(
                    WrapperHelper.successResponse(
                        200,
                        'Get Users Success',
                        response['data'],
                        null,
                    ),
                );
        } catch (error) {
            return res
                .status(500)
                .send(WrapperHelper.errorResponse(500, 'Get Users Error', {}, error));
        }
    }

    @Post()
    @ApiBody({ type: InsertUserDTO })
    async insertUser(@Req() req: Request, @Res() res: Response) {
        try {
            const requestBody = req['body'];
            await UsersModel.validateInsertUser(requestBody);

            const response = await this.usersService.insertUser(requestBody);
            return res
                .status(200)
                .send(
                    WrapperHelper.successResponse(
                        200,
                        'Insert Users Success',
                        response['data'],
                        null,
                    ),
                );
        } catch (error) {
            return res
                .status(500)
                .send(
                    WrapperHelper.errorResponse(500, 'Insert Users Error', {}, error),
                );
        }
    }

    @Post('/password')
    @ApiBody({ type: InsertPasswordDTO })
    async insertPasswordUser(@Req() req: Request, @Res() res: Response) {
        try {
            const requestBody = req['body'];

            await UsersModel.validateInsertPasswordUser(requestBody);

            const response = await this.usersService.insertPasswordUser(requestBody);
            return res
                .status(200)
                .send(
                    WrapperHelper.successResponse(
                        200,
                        'Insert Password Users Success',
                        response['data'],
                        null,
                    ),
                );
        } catch (error) {
            const getCode = error.status ? error.status : 500;

            return res
                .status(getCode)
                .send(
                    WrapperHelper.errorResponse(
                        getCode,
                        'Insert Password Users Error',
                        {},
                        error,
                    ),
                );
        }
    }

    @Put('/password')
    @ApiBody({ type: InsertPasswordDTO })
    async UpdatePasswordUser(@Req() req: Request, @Res() res: Response) {
        try {
            const requestBody = req['body'];

            await UsersModel.validateUpdatePasswordUser(requestBody);

            const response = await this.usersService.UpdatePasswordUser(requestBody);
            return res
                .status(200)
                .send(
                    WrapperHelper.successResponse(
                        200,
                        'Insert Password Users Success',
                        response['data'],
                        null,
                    ),
                );
        } catch (error) {
            const getCode = error.status ? error.status : 500;

            return res
                .status(getCode)
                .send(
                    WrapperHelper.errorResponse(
                        getCode,
                        'Insert Password Users Error',
                        {},
                        error,
                    ),
                );
        }
    }

    @ApiParam({
        name: 'username',
        required: true,
        description: 'put from list',
        type: String
    })
    @Delete('/password/:username')
    async deletePasswordUser(@Req() req: Request, @Res() res: Response) {
        try {
            const requestParams = req['params']['username'];
            if (!requestParams) {
                throw 'params must required';
            }

            const response = await this.usersService.deletePasswordUser({
                username: requestParams,
            });
            return res
                .status(200)
                .send(
                    WrapperHelper.successResponse(
                        200,
                        'Delete Password Users Success',
                        response['data'],
                        null,
                    ),
                );
        } catch (error) {
            const getCode = error.status ? error.status : 500;

            return res
                .status(getCode)
                .send(
                    WrapperHelper.errorResponse(
                        getCode,
                        'Delete Password Users Error',
                        {},
                        error,
                    ),
                );
        }
    }
}
