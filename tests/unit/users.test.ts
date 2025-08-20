// projects-api.test.ts
import { createMockAxios, HttpClient } from "../../src/httpClient";
import { UsersApi } from "../../src/users";

const mockedAxios = createMockAxios();

describe("Users", () => {
    let api: UsersApi;

    beforeEach(() => {
        const httpClient = new HttpClient("http://fake.url", 'fake-token', mockedAxios);
        api = new UsersApi(httpClient);
    });

    test("listForUser returns map data", async () => {
        // const fakeData: ProjectAttachment[] = [{ id: 1, path: "/image.jpg" }];

        // mockedAxios.get.mockResolvedValue({ data: fakeData });

        // const result = await api.list(1);
        // expect(result).toEqual(fakeData);
        // expect(mockedAxios.get).toHaveBeenCalledWith("/projects/1/attachments");
    });
});