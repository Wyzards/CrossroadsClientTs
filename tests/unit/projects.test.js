"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpClient_1 = require("../../src/httpClient");
const index_1 = require("../../src/projects/index");
describe("Projects", () => {
    let mockedAxios;
    let mockHttp;
    let api;
    beforeEach(() => {
        mockedAxios = (0, httpClient_1.createMockAxios)();
        mockHttp = new httpClient_1.HttpClient("http://fake.url", 'fake-token', mockedAxios);
        api = new index_1.ProjectsApi(mockHttp);
    });
    // ------------------- Projects -------------------
    test("list() calls GET /projects and returns Project[]", async () => {
        const mockData = [{ id: 1, name: "Test Project" }];
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.list();
        expect(mockHttp.instance.get).toHaveBeenCalledWith("/projects");
        expect(result).toEqual(mockData);
    });
    test("create() calls POST /projects with payload and returns Project", async () => {
        const payload = { name: "New Project" };
        const mockData = { id: 2, name: "New Project" };
        mockedAxios.post.mockResolvedValue({ data: mockData });
        const result = await api.create(payload);
        expect(mockHttp.instance.post).toHaveBeenCalledWith("/projects", payload);
        expect(result).toEqual(mockData);
    });
    test("get(id) calls GET /projects/:id and returns Project", async () => {
        const mockData = { id: 3, name: "Some Project" };
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.get(3);
        expect(mockHttp.instance.get).toHaveBeenCalledWith("/projects/3");
        expect(result).toEqual(mockData);
    });
    test("update(id, payload) calls PUT /projects/:id with payload and returns Project", async () => {
        const payload = { name: "Updated Project" };
        const mockData = { id: 3, name: "Updated Project" };
        mockedAxios.put.mockResolvedValue({ data: mockData });
        const result = await api.update(3, payload);
        expect(mockHttp.instance.put).toHaveBeenCalledWith("/projects/3", payload);
        expect(result).toEqual(mockData);
    });
    test("delete(id) calls DELETE /projects/:id and returns boolean", async () => {
        mockedAxios.delete.mockResolvedValue({ data: true });
        const result = await api.delete(3);
        expect(mockHttp.instance.delete).toHaveBeenCalledWith("/projects/3");
        expect(result).toBe(true);
    });
    // ------------------- Staff -------------------
    test("listStaff(projectId) calls GET /projects/:id/staff and returns ProjectStaff[]", async () => {
        const mockData = [{ userId: 1, role: "Admin" }];
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.listStaff(3);
        expect(mockHttp.instance.get).toHaveBeenCalledWith("/projects/3/staff");
        expect(result).toEqual(mockData);
    });
    test("addStaff(projectId, userId, role) calls POST /projects/:id/staff and returns ProjectStaff", async () => {
        const mockData = { userId: 2, role: "Editor" };
        mockedAxios.post.mockResolvedValue({ data: mockData });
        const result = await api.addStaff(3, 2, "Editor");
        expect(mockHttp.instance.post).toHaveBeenCalledWith("/projects/3/staff", { userId: 2, role: "Editor" });
        expect(result).toEqual(mockData);
    });
    test("removeStaff(projectId, userId) calls DELETE /projects/:id/staff/:userId and returns boolean", async () => {
        mockedAxios.delete.mockResolvedValue({ data: true });
        const result = await api.removeStaff(3, 2);
        expect(mockHttp.instance.delete).toHaveBeenCalledWith("/projects/3/staff/2");
        expect(result).toBe(true);
    });
    // ------------------- Attachments -------------------
    test("listAttachments(projectId) calls GET /projects/:id/attachments and returns ProjectAttachment[]", async () => {
        const mockData = [{ id: 1, path: "file.pdf" }];
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.listAttachments(3);
        expect(mockHttp.instance.get).toHaveBeenCalledWith("/projects/3/attachments");
        expect(result).toEqual(mockData);
    });
    test("addAttachment(projectId, attachment) calls POST /projects/:id/attachments and returns ProjectAttachment", async () => {
        const attachment = { name: "file.pdf" };
        const mockData = { id: 1, path: "file.pdf" };
        mockedAxios.post.mockResolvedValue({ data: mockData });
        const result = await api.addAttachment(3, attachment);
        expect(mockHttp.instance.post).toHaveBeenCalledWith("/projects/3/attachments", attachment);
        expect(result).toEqual(mockData);
    });
    test("removeAttachment(projectId, attachmentId) calls DELETE /projects/:id/attachments/:attachmentId and returns boolean", async () => {
        mockedAxios.delete.mockResolvedValue({ data: true });
        const result = await api.removeAttachment(3, 1);
        expect(mockHttp.instance.delete).toHaveBeenCalledWith("/projects/3/attachments/1");
        expect(result).toBe(true);
    });
    // ------------------- Links -------------------
    test("listLinks(projectId) calls GET /projects/:id/links and returns ProjectLink[]", async () => {
        const mockData = [{ id: 1, url: "http://example.com" }];
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.listLinks(3);
        expect(mockHttp.instance.get).toHaveBeenCalledWith("/projects/3/links");
        expect(result).toEqual(mockData);
    });
    test("addLink(projectId, link) calls POST /projects/:id/links and returns ProjectLink", async () => {
        const link = { url: "http://example.com" };
        const mockData = { id: 1, url: "http://example.com" };
        mockedAxios.post.mockResolvedValue({ data: mockData });
        const result = await api.addLink(3, link);
        expect(mockHttp.instance.post).toHaveBeenCalledWith("/projects/3/links", link);
        expect(result).toEqual(mockData);
    });
    test("removeLink(projectId, linkId) calls DELETE /projects/:id/links/:linkId and returns boolean", async () => {
        mockedAxios.delete.mockResolvedValue({ data: true });
        const result = await api.removeLink(3, 1);
        expect(mockHttp.instance.delete).toHaveBeenCalledWith("/projects/3/links/1");
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=projects.test.js.map