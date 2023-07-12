import { TestConnection } from "./mockTestUtil";

const utilInstance = new TestConnection();

beforeAll(async () => {
    await utilInstance.create();
});

afterAll(async () => {
    await utilInstance.close();
});