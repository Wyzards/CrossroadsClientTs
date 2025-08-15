import { AxiosInstance } from "axios";
import { createHttpClient } from "./httpClient";
import { MapsApi } from "./maps";
import { MapInstancesApi } from "./mapInstances";
import { UsersApi } from "./users";
import { ProjectsApi } from "./projects";

export class CrossroadsApiClient {
    public maps: MapsApi;
    public mapInstances: MapInstancesApi;
    public users: UsersApi;
    public projects: ProjectsApi;

    constructor(baseURL: string, token: string) {
        const http: AxiosInstance = createHttpClient(baseURL, token);

        this.maps = new MapsApi(http);
        this.mapInstances = new MapInstancesApi(http);
        this.users = new UsersApi(http);
        this.projects = new ProjectsApi(http);
    }
}