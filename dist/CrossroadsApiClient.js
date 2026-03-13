"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossroadsApiClient = void 0;
const error_js_1 = require("./error.js");
const httpClient_1 = require("./httpClient");
const mapInstances_1 = require("./mapInstances");
const maps_1 = require("./maps");
const projects_1 = require("./projects");
const users_1 = require("./users");
class CrossroadsApiClient {
    constructor(baseURL, token) {
        const http = new httpClient_1.HttpClient(baseURL, token);
        this.maps = new maps_1.MapsApi(http);
        this.mapInstances = new mapInstances_1.MapInstancesApi(http);
        this.users = new users_1.CrossroadsUsersApi(http);
        this.projects = new projects_1.ProjectsApi(http);
    }
    async setProjectStaffByDiscordId(projectId, discordId, rank) {
        let user;
        try {
            user = await this.users.findByDiscordId(discordId);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError) {
                user = await this.users.create({ discordId });
            }
            else {
                throw err;
            }
        }
        return this.projects.setStaff(projectId, user.id, rank);
    }
    async removeProjectStaffByDiscordId(projectId, discordId) {
        let user;
        try {
            user = await this.users.findByDiscordId(discordId);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError) {
                // User doesn't exist → cannot be staff
                return false;
            }
            throw err;
        }
        return this.projects.removeStaff(projectId, user.id);
    }
}
exports.CrossroadsApiClient = CrossroadsApiClient;
//# sourceMappingURL=CrossroadsApiClient.js.map