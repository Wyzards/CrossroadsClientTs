// projects-api.test.ts
import { createMockAxios, HttpClient } from "../../src/httpClient";
import { ProjectsApi } from "../../src/projects/index";
import type { ProjectAttachment } from "../../src/projects/types";

const mockedAxios = createMockAxios();

describe("Projects", () => {
    let api: ProjectsApi;

    beforeEach(() => {
        const httpClient = new HttpClient("http://fake.url", 'fake-token', mockedAxios);
        api = new ProjectsApi(httpClient);
    });

    test("listAttachments returns attachment data", async () => {
        const fakeData: ProjectAttachment[] = [{ id: 1, path: "/image.jpg" }];

        mockedAxios.get.mockResolvedValue({ data: fakeData });

        const result = await api.listAttachments(1);
        expect(result).toEqual(fakeData);
        expect(mockedAxios.get).toHaveBeenCalledWith("/projects/1/attachments");
    });
});