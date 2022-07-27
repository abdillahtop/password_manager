import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { UsersModule } from "../users.module";

describe("UsersController", () => {

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UsersService],
        }).compile();

        module.get<UsersController>(UsersController);
        module.get<UsersService>(UsersService);
    });

    it("Should be defined", () => {
        expect(UsersModule).toBeDefined();
    });
});
