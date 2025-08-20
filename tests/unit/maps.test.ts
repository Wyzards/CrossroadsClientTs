// projects-api.test.ts
import { createMockAxios, HttpClient } from "../../src/httpClient";
import { MapsApi } from "../../src/maps";

const mockedAxios = createMockAxios();

describe("Maps", () => {
    let api: MapsApi;

    beforeEach(() => {
        const httpClient = new HttpClient("http://fake.url", 'fake-token', mockedAxios);
        api = new MapsApi(httpClient);
    });

    test("listForUser returns map data", async () => {
        // const fakeData: ProjectAttachment[] = [{ id: 1, path: "/image.jpg" }];

        // mockedAxios.get.mockResolvedValue({ data: fakeData });

        // const result = await api.list(1);
        // expect(result).toEqual(fakeData);
        // expect(mockedAxios.get).toHaveBeenCalledWith("/projects/1/attachments");
    });
});