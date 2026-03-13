import { MapInstancesApi } from "./mapInstances";
import { MapsApi } from "./maps";
import { ProjectsApi } from "./projects";
import { ProjectStaff, ProjectStaffRank } from "./projects/types.js";
import { CrossroadsUsersApi } from "./users";
export declare class CrossroadsApiClient {
    maps: MapsApi;
    mapInstances: MapInstancesApi;
    users: CrossroadsUsersApi;
    projects: ProjectsApi;
    constructor(baseURL: string, token: string);
    setProjectStaffByDiscordId(projectId: number, discordId: string, rank: ProjectStaffRank): Promise<ProjectStaff>;
    removeProjectStaffByDiscordId(projectId: number, discordId: string): Promise<boolean>;
}
//# sourceMappingURL=CrossroadsApiClient.d.ts.map