// crossroadsUsersApi.test.ts
import { HttpClient, createMockAxios } from "../../src/httpClient";
import { CrossroadsUsersApi } from "../../src/users/index";
import { CrossroadsUser, CreateCrossroadsUserPayload } from "../../src/users/types";

describe("CrossroadsUsersApi", () => {
    let mockedAxios: any;
    let mockHttp: HttpClient;
    let api: CrossroadsUsersApi;

    beforeEach(() => {
        // Create a fresh mocked Axios instance
        mockedAxios = createMockAxios();

        // Real HttpClient instance wrapping mockedAxios
        mockHttp = new HttpClient("http://fake.url", 'fake-token', mockedAxios);

        // CrossroadsUsers API instance
        api = new CrossroadsUsersApi(mockHttp);
    });

    // ------------------- create -------------------
    test("create() calls POST /crossroads-users with payload and returns CrossroadsUser", async () => {
        const payload: CreateCrossroadsUserPayload = { discordId: "123456789" };
        const mockData: CrossroadsUser = { id: 1, discordId: "123456789" };
        mockedAxios.post.mockResolvedValue({ data: mockData });

        const result = await api.create(payload);

        expect(mockedAxios.post).toHaveBeenCalledWith("/crossroads-users", payload);
        expect(result).toEqual(mockData);
    });

    // ------------------- list -------------------
    test("list() calls GET /crossroads-users and returns CrossroadsUser[]", async () => {
        const mockData: CrossroadsUser[] = [{ id: 1, discordId: "000000001" }];
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const result = await api.list();

        expect(mockedAxios.get).toHaveBeenCalledWith("/crossroads-users");
        expect(result).toEqual(mockData);
    });

    // ------------------- get -------------------
    test("get() calls GET /crossroads-users/:id and returns CrossroadsUser", async () => {
        const mockData: CrossroadsUser = { id: 1, minecraftUuid: "bf00a4f5-fedc-4e92-aef0-c7c8d666de65" };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const result = await api.get(1);

        expect(mockedAxios.get).toHaveBeenCalledWith("/crossroads-users/1");
        expect(result).toEqual(mockData);
    });

    // ------------------- delete -------------------
    test("delete() calls DELETE /crossroads-users/:id and returns result", async () => {
        const mockData = { success: true };
        mockedAxios.delete.mockResolvedValue({ data: mockData });

        const result = await api.delete(1);

        expect(mockedAxios.delete).toHaveBeenCalledWith("/crossroads-users/1");
        expect(result).toEqual(mockData);
    });

    // ------------------- findByMinecraftUuid -------------------
    test("findByMinecraftUuid() calls GET /crossroads-users/minecraft/:uuid and returns CrossroadsUser", async () => {
        const mockData: CrossroadsUser = { id: 1, minecraftUuid: "bf00a4f5-fedc-4e92-aef0-c7c8d666de65" };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const result = await api.findByMinecraftUuid("bf00a4f5-fedc-4e92-aef0-c7c8d666de65");

        expect(mockedAxios.get).toHaveBeenCalledWith("/crossroads-users/minecraft/bf00a4f5-fedc-4e92-aef0-c7c8d666de65");
        expect(result).toEqual(mockData);
    });

    // ------------------- findByDiscordId -------------------
    test("findByDiscordId() calls GET /crossroads-users/discord/:discordId and returns CrossroadsUser", async () => {
        const mockData: CrossroadsUser = { id: 1, discordId: "123456789" };
        mockedAxios.get.mockResolvedValue({ data: mockData });

        const result = await api.findByDiscordId("123456789");

        expect(mockedAxios.get).toHaveBeenCalledWith("/crossroads-users/discord/123456789");
        expect(result).toEqual(mockData);
    });
});