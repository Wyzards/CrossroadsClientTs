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
const index_js_6 = require("./gameNights/index.js");
const index_js_7 = require("./tags/index.js");
const index_js_8 = require("./applications/index.js");
const index_js_9 = require("./tagRequests/index.js");
const index_js_10 = require("./announcementConnections/index.js");
const index_js_11 = require("./inviteChecks/index.js");
const index_js_12 = require("./vetting/index.js");
const index_js_13 = require("./huntSuggestions/index.js");
class CrossroadsApiClient {
    /** options.readOnly: every request except GET (and the read-only POST searches) is refused; for dry runs. */
    constructor(baseURL, token, options = {}) {
        const http = new httpClient_1.HttpClient(baseURL, token, undefined, options);
        this.maps = new maps_1.MapsApi(http);
        this.mapInstances = new mapInstances_1.MapInstancesApi(http);
        this.users = new users_1.CrossroadsUsersApi(http);
        this.projects = new projects_1.ProjectsApi(http);
        this.projectLists = new index_js_4.ProjectListsApi(http);
        this.projectListEntries = new index_js_3.ProjectListEntriesApi(http);
        this.badges = new index_js_1.BadgesApi(http);
        this.eras = new index_js_2.ErasApi(http);
        this.xp = new index_js_5.XpApi(http);
        this.gameNights = new index_js_6.GameNightsApi(http);
        this.tags = new index_js_7.TagsApi(http);
        this.applications = new index_js_8.ApplicationsApi(http);
        this.tagRequests = new index_js_9.TagRequestsApi(http);
        this.announcementConnections = new index_js_10.AnnouncementConnectionsApi(http);
        this.inviteChecks = new index_js_11.InviteChecksApi(http);
        this.vetting = new index_js_12.VettingApi(http);
        this.huntSuggestions = new index_js_13.HuntSuggestionsApi(http);
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