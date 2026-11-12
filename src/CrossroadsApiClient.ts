import { BadgesApi } from "./badges/index.js";
import { ErasApi } from "./eras/index.js";
import { NotFoundError } from "./error.js";
import { HttpClient } from "./httpClient";
import { MapInstancesApi } from "./mapInstances";
import { MapsApi } from "./maps";
import { ProjectListEntriesApi } from "./projectListEntries/index.js";
import { ProjectListsApi } from "./projectLists/index.js";
import { ProjectsApi } from "./projects";
import { ProjectStaff, ProjectStaffRank } from "./projects/types.js";
import { CrossroadsUsersApi } from "./users";
import { CrossroadsUser } from "./users/types.js";
import { XpApi } from "./xp/index.js";
import { GameNightsApi } from "./gameNights/index.js";
import { TagsApi } from "./tags/index.js";
import { ApplicationsApi } from "./applications/index.js";
import { TagRequestsApi } from "./tagRequests/index.js";
import { AnnouncementConnectionsApi } from "./announcementConnections/index.js";
import { InviteChecksApi } from "./inviteChecks/index.js";

export class CrossroadsApiClient {
    public maps: MapsApi;
    public mapInstances: MapInstancesApi;
    public users: CrossroadsUsersApi;
    public projects: ProjectsApi;
    public projectLists: ProjectListsApi;
    public projectListEntries: ProjectListEntriesApi;
    public badges: BadgesApi;
    public eras: ErasApi;
    public xp: XpApi;
    public gameNights: GameNightsApi;
    public tags: TagsApi;
    public applications: ApplicationsApi;
    public tagRequests: TagRequestsApi;
    public announcementConnections: AnnouncementConnectionsApi;
    public inviteChecks: InviteChecksApi;

    constructor(baseURL: string, token: string) {
        const http: HttpClient = new HttpClient(baseURL, token);

        this.maps = new MapsApi(http);
        this.mapInstances = new MapInstancesApi(http);
        this.users = new CrossroadsUsersApi(http);
        this.projects = new ProjectsApi(http);
        this.projectLists = new ProjectListsApi(http);
        this.projectListEntries = new ProjectListEntriesApi(http);
        this.badges = new BadgesApi(http);
        this.eras = new ErasApi(http);
        this.xp = new XpApi(http);
        this.gameNights = new GameNightsApi(http);
        this.tags = new TagsApi(http);
        this.applications = new ApplicationsApi(http);
        this.tagRequests = new TagRequestsApi(http);
        this.announcementConnections = new AnnouncementConnectionsApi(http);
        this.inviteChecks = new InviteChecksApi(http);
    }

    async setProjectStaffByDiscordId(
        projectId: number,
        discordId: string,
        rank: ProjectStaffRank
    ): Promise<ProjectStaff> {

        let user = await this.users.findByDiscordId(discordId);

        if (!user) {
            user = await this.users.create({ discordId });
        }

        return this.projects.setStaff(projectId, user.id, rank);
    }

    async removeProjectStaffByDiscordId(
        projectId: number,
        discordId: string
    ): Promise<boolean> {

        let user = await this.users.findByDiscordId(discordId);

        if (!user) return false;

        return this.projects.removeStaff(projectId, user.id);
    }
}