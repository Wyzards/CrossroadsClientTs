// projects-api.test.ts
import axios, { AxiosInstance } from "axios";
import { ProjectsApi } from "../../src/projects/index";
import type { ProjectAttachment, ProjectLink } from "../../src/projects/types";
import { HttpClient } from "../../src/httpClient";

function createMockAxios(): jest.Mocked<AxiosInstance> {
    return {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
        request: jest.fn(),
        // Include interceptors if your code uses them
        interceptors: { request: { use: jest.fn(), eject: jest.fn() }, response: { use: jest.fn(), eject: jest.fn() } },
    } as any;
}

const mockedAxios = createMockAxios();

describe("ProjectsApi", () => {
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

    // test("removeLink returns true on 204", async () => {
    //     mockedAxios.delete.mockResolvedValue({ status: 204 });

    //     const result = await api.removeLink(1, 2);
    //     expect(result).toBe(true);
    //     expect(mockedAxios.delete).toHaveBeenCalledWith("/projects/1/links/2");
    // });

    // test("removeLink throws on non-204", async () => {
    //     mockedAxios.delete.mockResolvedValue({ status: 404 });

    //     await expect(api.removeLink(1, 2)).rejects.toThrow("Project or link not found when removing link: 404 undefined");
    // });
});