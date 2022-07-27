import { Test, TestingModule } from "@nestjs/testing";
import { DatabaseConfig } from "src/configs/db.config";
import { AppHelper } from "src/helpers/app.helper";
import { UsersQuery } from "../users.query";
import { UsersService } from "../users.service";

describe('UsersService', () => {
    let userService: UsersService;
    let payloadUser = {
        username: "test1",
        name: "abdillah",
        page: '1',
        limit: '10',
        sort: 'asc',
        error: true,
        search: 'test1',
        secure: ''
    }

    beforeEach(async () => {
        jest.fn().mockImplementation((value) => Promise.resolve(value));
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();

        userService = module.get<UsersService>(UsersService);
    });

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

    const resultResponseEmpty = {
        data: [],
        pagination: {
            page: 1,
            limit: 10,
            totalDataOnThisPage: 0,
            total: 0,
            totalPage: 1
        }
    }

    // const resCountUser = [{ count: '6' }]

    const resError: object = {
        error: {
            message: 'Error'
        }
    }

    const resultError = {
        "error": {
            "message": "Error"
        }
    }

    describe('getUsers', () => {

        it('got error in function getUsers & getCount ', async () => {
            // expect(UsersQuery.getUsers(payloadUser)).rejects
            // expect(UsersQuery.getCountUsers(payloadUser)).rejects
            const spygetUsers = jest.spyOn(UsersQuery, 'getUsers');
            const spygetCountUsers = jest.spyOn(UsersQuery, 'getCountUsers');
            // const input1 = UsersQuery.getUsers(payloadUser);
            // const input2 = UsersQuery.getCountUsers(payloadUser);

            const result = await userService.getUsers(payloadUser)
            // console.log('result', spygetUsers, spygetCountUsers);
            expect(spygetUsers).toHaveBeenCalled();
            expect(spygetCountUsers).toHaveBeenCalled();
            //     expect(input1).toStrictEqual(`select u.*,pu.password, pu.updated_at as updated_password_at from users u 
            // left join password_users pu ON pu.username = u.username AND pu.is_deleted=false WHERE u.username like 'test1%' ORDER BY username asc LIMIT 10 OFFSET 0`)
            //     expect(input2).toStrictEqual(`SELECT COUNT(1) as count FROM (select u.*,pu.password, pu.updated_at as updated_password_at from users u 
            // left join password_users pu ON pu.username = u.username AND pu.is_deleted=false WHERE u.username like 'test1%') as count`)
            spygetUsers.mockRestore()
            spygetCountUsers.mockRestore()
        })

    })

})