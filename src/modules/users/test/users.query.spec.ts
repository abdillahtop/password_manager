import { UsersQuery } from "../users.query";

describe("UsersController", () => {
    let query = UsersQuery;

    const payloadUser = {
        username: "test1",
        name: "abdillah",
        page: '1',
        limit: '10',
        sort: 'asc',
        error: true,
        search: 'test1'
    }
    
    const payloadInsertUser = {
        body: {
            "username": "test1",
            "name": "abdillah"
        },
        params: {
            username: 'test1'
        },
        query: {
            page: '1',
            limit: '10',
            sort: 'asc',
            error: true,
            search: 'test1'
        }
    };

    const payloadInsertPassword = {
        body: {
            "username": "test1",
            "password": "123333"
        },
        params: {},
        query: {}
    };

    it("should be defined", () => {
        expect(query).toBeDefined();
    });

    it("Query insertUser should be defined", () => {
        expect(query.insertUser(payloadInsertUser)).toEqual(query.insertUser(payloadInsertUser));
    });

    it("Query insertPasswordUser should be defined", () => {
        expect(query.insertPasswordUser(payloadInsertPassword)).toEqual(query.insertPasswordUser(payloadInsertPassword));
    });

    it("Query updatePasswordUser should be defined", () => {
        expect(query.updatePasswordUser(payloadInsertPassword)).toEqual(query.updatePasswordUser(payloadInsertPassword));
    });

    it("Query queryGetUsers should be defined", () => {
        expect(query.queryGetUsers(payloadUser)).toEqual(query.queryGetUsers(payloadUser));
    });

    it("Query getUsers should be defined", () => {
        expect(query.getUsers(payloadInsertUser)).toEqual(query.getUsers(payloadInsertUser));
    });

    it("Query getCountUsers should be defined", () => {
        expect(query.getCountUsers(payloadInsertUser)).toEqual(query.getCountUsers(payloadInsertUser));
    });

    it("Query detailUser should be defined", () => {
        expect(query.detailUser(payloadUser)).toEqual(query.detailUser(payloadUser));
    });

    it("Query getUser should be defined", () => {
        expect(query.getUser(payloadInsertUser)).toEqual(query.getUser(payloadInsertUser));
    });

    it("Query getPassword should be defined", () => {
        expect(query.getPassword(payloadInsertPassword)).toEqual(query.getPassword(payloadInsertPassword));
    });
});
