import { HttpClient } from "./httpClient";
import { MapInstancesApi } from "./mapInstances";
import { MapsApi } from "./maps";
import { ProjectsApi } from "./projects";
import { CrossroadsUsersApi } from "./users";

export class CrossroadsApiClient {
    public maps: MapsApi;
    public mapInstances: MapInstancesApi;
    public users: CrossroadsUsersApi;
    public projects: ProjectsApi;

    constructor(baseURL: string, token: string) {
        const http: HttpClient = new HttpClient(baseURL, token);

        this.maps = new MapsApi(http);
        this.mapInstances = new MapInstancesApi(http);
        this.users = new CrossroadsUsersApi(http);
        this.projects = new ProjectsApi(http);
    }
}