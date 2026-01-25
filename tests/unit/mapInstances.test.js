"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mapInstancesApi.test.ts
const httpClient_1 = require("../../src/httpClient");
const index_1 = require("../../src/mapInstances/index");
describe("MapInstancesApi", () => {
    let mockedAxios;
    let mockHttp;
    let api;
    beforeEach(() => {
        // Fresh mocked Axios for each test
        mockedAxios = (0, httpClient_1.createMockAxios)();
        // Real HttpClient instance wrapping mockedAxios
        mockHttp = new httpClient_1.HttpClient("http://fake.url", 'fake-token', mockedAxios);
        api = new index_1.MapInstancesApi(mockHttp);
    });
    // ------------------- listForUser -------------------
    test("listForUser() calls GET /map-instances/user/:userId and returns MapInstance[]", async () => {
        const mockData = [{ id: 1, mapId: 1, userId: 42 }];
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.listForUser(42);
        expect(mockedAxios.get).toHaveBeenCalledWith("/map-instances/user/42");
        expect(result).toEqual(mockData);
    });
    // ------------------- createForUser -------------------
    test("createForUser() calls POST /map-instances/user/:userId with payload and returns MapInstance", async () => {
        const payload = { mapId: 2 };
        const mockData = { id: 2, mapId: 2, userId: 42 };
        mockedAxios.post.mockResolvedValue({ data: mockData });
        const result = await api.createForUser(42, payload);
        expect(mockedAxios.post).toHaveBeenCalledWith("/map-instances/user/42", payload);
        expect(result).toEqual(mockData);
    });
    // ------------------- getSecondaryUsers -------------------
    test("getSecondaryUsers() calls GET /map-instances/:instanceId/secondary-users and returns SecondaryUser[]", async () => {
        const mockData = [{ id: 1 }];
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.getSecondaryUsers(99);
        expect(mockedAxios.get).toHaveBeenCalledWith("/map-instances/99/secondary-users");
        expect(result).toEqual(mockData);
    });
    // ------------------- addSecondaryUser -------------------
    test("addSecondaryUser() calls POST /map-instances/:instanceId/secondary-users with correct payload", async () => {
        const mockData = { success: true };
        mockedAxios.post.mockResolvedValue({ data: mockData });
        const result = await api.addSecondaryUser(99, 7);
        expect(mockedAxios.post).toHaveBeenCalledWith("/map-instances/99/secondary-users", { userId: 7 });
        expect(result).toEqual(mockData);
    });
    // ------------------- removeSecondaryUser -------------------
    test("removeSecondaryUser() calls DELETE /map-instances/:instanceId/secondary-users/:userId", async () => {
        const mockData = { success: true };
        mockedAxios.delete.mockResolvedValue({ data: mockData });
        const result = await api.removeSecondaryUser(99, 7);
        expect(mockedAxios.delete).toHaveBeenCalledWith("/map-instances/99/secondary-users/7");
        expect(result).toEqual(mockData);
    });
    // ------------------- delete -------------------
    test("delete() calls DELETE /map-instances/:instanceId", async () => {
        const mockData = { success: true };
        mockedAxios.delete.mockResolvedValue({ data: mockData });
        const result = await api.delete(99);
        expect(mockedAxios.delete).toHaveBeenCalledWith("/map-instances/99");
        expect(result).toEqual(mockData);
    });
});
//# sourceMappingURL=mapInstances.test.js.map