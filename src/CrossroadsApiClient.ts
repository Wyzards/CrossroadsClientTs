import { NotFoundError } from "./error.js";
import { HttpClient } from "./httpClient";
import { MapInstancesApi } from "./mapInstances";
import { MapsApi } from "./maps";
import { ProjectsApi } from "./projects";
import { ProjectStaff, ProjectStaffRank } from "./projects/types.js";
import { CrossroadsUsersApi } from "./users";
import { CrossroadsUser } from "./users/types.js";

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

    async setProjectStaffByDiscordId(
        projectId: number,
        discordId: string,
        rank: ProjectStaffRank
    ): Promise<ProjectStaff> {

        let user: CrossroadsUser;

        try {
            user = await this.users.findByDiscordId(discordId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                user = await this.users.create({ discordId });
            } else {
                throw err;
            }
        }

        return this.projects.setStaff(projectId, user.id, rank);
    }

    async removeProjectStaffByDiscordId(
        projectId: number,
        discordId: string
    ): Promise<boolean> {

        let user: CrossroadsUser;

        try {
            user = await this.users.findByDiscordId(discordId);
        } catch (err) {
            if (err instanceof NotFoundError) {
                // User doesn't exist → cannot be staff
                return false;
            }
            throw err;
        }

        return this.projects.removeStaff(projectId, user.id);
    }
}