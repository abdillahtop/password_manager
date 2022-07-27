import { } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { UsersModel } from "../users.model";
import * as mocks from 'node-mocks-http'

describe('USersController', () => {
    let usersController: UsersController
    let usersService: UsersService
    const req = mocks.createRequest()
    req.res = mocks.createResponse()

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });



    it('Controller Should be defined', () => {
        expect(usersController).toBeDefined()
    })

    it('Service Should be defined', () => {
        expect(UsersService).toBeDefined()
    })

    describe('GetUsers', () => {
        let users
        const resultResponse = {
            data: [
                {
                    id: 15,
                    name: 'abdillah',
                    username: 'test1',
                    is_deleted: false,
                    updated_by: 'test1',
                    created_at: new Date('2022-07-27T00:57:10.000Z'),
                    updated_at: new Date('2022-07-27T00:57:10.000Z'),
                    password: 'U2FsdGVkX1+YpsRoZw/svxf4fBnTdlkEtyZn0wV+bsE=',
                    updated_password_at: new Date('2022-07-27T00:57:36.000Z')
                }
            ],
            pagination: {
                page: 1,
                limit: 10,
                totalDataOnThisPage: 1,
                total: '1',
                totalPage: 1
            }
        }

        req.query.page = '1'
        req.query.limit = '10'
        req.query.sort = 'asc'
        req.query.search = 'test1'
        
        beforeEach(async () => {
            users = await usersController.getUsers(req, req.res)
        })

        it('Got Error Validate', async () => {
            req.query.getFalse = ''
            expect(UsersModel.validateGetUsers(req.query)).rejects
        })

        it('then it call usersService ', async () => {
            delete req.query.getFalse
            const call = jest.fn()
            call.mockReturnValue(usersService.getUsers(req.query))
            expect(await call()).toStrictEqual(resultResponse)
        })

    });
});
