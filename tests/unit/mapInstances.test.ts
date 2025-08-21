// mapInstancesApi.test.ts
import { createMockAxios, HttpClient } from "../../src/httpClient";
import { MapInstancesApi } from "../../src/mapInstances/index";
import { CreateMapInstancePayload, MapInstance } from "../../src/mapInstances/types";
import { CrossroadsUser } from "../../src/users/types.js";

describe("MapInstancesApi", () => {
    let mockedAxios: any;
    let mockHttp: any;
    let api: MapInstancesApi;

    beforeEach(() => {
        // Fresh mocked Axios for each test
        mockedAxios = createMockAxios();

        // Real HttpClient instance wrapping mockedAxios
        mockHttp = new HttpClient("http://fake.url", 'fake-token', mockedAxios);
        api = new MapInstancesApi(mockHttp);
    });

    // ------------------- listForUser -------------------
    test("listForUser() calls GET /map-instances/user/:userId and returns MapInstance[]", async () => {
        const mockData: MapInstance[] = [{ id: 1, mapId: 1, userId: 42 }];
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const result = await api.listForUser(42);

        expect(mockedAxios.get).toHaveBeenCalledWith("/map-instances/user/42");
        expect(result).toEqual(mockData);
    });

    // ------------------- createForUser -------------------
    test("createForUser() calls POST /map-instances/user/:userId with payload and returns MapInstance", async () => {
        const payload: CreateMapInstancePayload = { mapId: 2 };
        const mockData: MapInstance = { id: 2, mapId: 2, userId: 42 };
        mockedAxios.post.mockResolvedValue({ data: mockData });

        const result = await api.createForUser(42, payload);

        expect(mockedAxios.post).toHaveBeenCalledWith("/map-instances/user/42", payload);
        expect(result).toEqual(mockData);
    });

    // ------------------- getSecondaryUsers -------------------
    test("getSecondaryUsers() calls GET /map-instances/:instanceId/secondary-users and returns SecondaryUser[]", async () => {
        const mockData: CrossroadsUser[] = [{ id: 1 }];
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