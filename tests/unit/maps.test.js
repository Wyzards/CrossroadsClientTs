"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// mapsApi.test.ts
const index_1 = require("../../src/maps/index");
const httpClient_1 = require("../../src/httpClient");
describe("MapsApi", () => {
    let mockedAxios;
    let mockHttp;
    let api;
    beforeEach(() => {
        // Create a fresh mocked Axios instance using your helper
        mockedAxios = (0, httpClient_1.createMockAxios)();
        // Wrap it in a real HttpClient
        mockHttp = new httpClient_1.HttpClient("http://fake.url", 'fake-token', mockedAxios);
        // Maps API instance
        api = new index_1.MapsApi(mockHttp);
    });
    // ------------------- getByImageName -------------------
    test("getByImageName() calls GET /maps/by-image-name/:imageName and returns Map", async () => {
        const mockData = { id: 1, name: "Map1", imageName: "map_1" };
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.getByImageName("map_1");
        expect(mockedAxios.get).toHaveBeenCalledWith("/maps/by-image-name/map_1");
        expect(result).toEqual(mockData);
    });
    // ------------------- deleteByImageName -------------------
    test("deleteByImageName() calls DELETE /maps/by-image-name/:imageName and returns result", async () => {
        const mockData = { success: true };
        mockedAxios.delete.mockResolvedValue({ data: mockData });
        const result = await api.deleteByImageName("map_1");
        expect(mockedAxios.delete).toHaveBeenCalledWith("/maps/by-image-name/map_1");
        expect(result).toEqual(mockData);
    });
    // ------------------- list -------------------
    test("list() calls GET /maps and returns Map[]", async () => {
        const mockData = [{ id: 1, name: "Map1", imageName: "map_1" }];
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.list();
        expect(mockedAxios.get).toHaveBeenCalledWith("/maps");
        expect(result).toEqual(mockData);
    });
    // ------------------- create -------------------
    test("create() calls POST /maps with payload and returns Map", async () => {
        const payload = { name: "New Map", imageName: "map_2" };
        const mockData = { id: 2, name: "New Map", imageName: "map_2" };
        mockedAxios.post.mockResolvedValue({ data: mockData });
        const result = await api.create(payload);
        expect(mockedAxios.post).toHaveBeenCalledWith("/maps", payload);
        expect(result).toEqual(mockData);
    });
    // ------------------- get -------------------
    test("get() calls GET /maps/:id and returns Map", async () => {
        const mockData = { id: 3, name: "Map3", imageName: "map_3" };
        mockedAxios.get.mockResolvedValue({ data: mockData });
        const result = await api.get(3);
        expect(mockedAxios.get).toHaveBeenCalledWith("/maps/3");
        expect(result).toEqual(mockData);
    });
});
//# sourceMappingURL=maps.test.js.map