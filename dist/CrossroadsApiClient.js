"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossroadsApiClient = void 0;
const index_js_1 = require("./badges/index.js");
const index_js_2 = require("./eras/index.js");
const httpClient_1 = require("./httpClient");
const mapInstances_1 = require("./mapInstances");
const maps_1 = require("./maps");
const index_js_3 = require("./projectListEntries/index.js");
const index_js_4 = require("./projectLists/index.js");
const projects_1 = require("./projects");
const users_1 = require("./users");
const index_js_5 = require("./xp/index.js");
class CrossroadsApiClient {
    constructor(baseURL, token) {
        const http = new httpClient_1.HttpClient(baseURL, token);
        this.maps = new maps_1.MapsApi(http);
        this.mapInstances = new mapInstances_1.MapInstancesApi(http);
        this.users = new users_1.CrossroadsUsersApi(http);
        this.projects = new projects_1.ProjectsApi(http);
        this.projectLists = new index_js_4.ProjectListsApi(http);
        this.projectListEntries = new index_js_3.ProjectListEntriesApi(http);
        this.badges = new index_js_1.BadgesApi(http);
        this.eras = new index_js_2.ErasApi(http);
        this.xp = new index_js_5.XpApi(http);
    }
    async setProjectStaffByDiscordId(projectId, discordId, rank) {
        let user = await this.users.findByDiscordId(discordId);
        if (!user) {
            user = await this.users.create({ discordId });
        }
        return this.projects.setStaff(projectId, user.id, rank);
    }
    async removeProjectStaffByDiscordId(projectId, discordId) {
        let user = await this.users.findByDiscordId(discordId);
        if (!user)
            return false;
        return this.projects.removeStaff(projectId, user.id);
    }
}
exports.CrossroadsApiClient = CrossroadsApiClient;
//# sourceMappingURL=CrossroadsApiClient.js.map