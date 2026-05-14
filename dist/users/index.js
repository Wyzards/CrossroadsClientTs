"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossroadsUsersApi = void 0;
const error_js_1 = require("../error.js");
class CrossroadsUsersApi {
    constructor(http) {
        this.http = http;
    }
    create(payload) {
        return this.http.post(`/crossroads-users`, {
            minecraft_uuid: payload.minecraftUuid,
            discord_id: payload.discordId
        });
    }
    list() {
        return this.http.get(`/crossroads-users`);
    }
    get(id) {
        return this.http.get(`/crossroads-users/${id}`);
    }
    delete(id) {
        return this.http.delete(`/crossroads-users/${id}`);
    }
    async findByMinecraftUuid(uuid) {
        try {
            return await this.http.get(`/crossroads-users/minecraft/${uuid}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    async findByDiscordId(discordId) {
        try {
            return await this.http.get(`/crossroads-users/discord/${discordId}`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    async getProfile(userId) {
        try {
            return await this.http.get(`/crossroads-users/${userId}/profile`);
        }
        catch (err) {
            if (err instanceof error_js_1.NotFoundError)
                return null;
            throw err;
        }
    }
    async getLeaderboard(viewerUserId, type) {
        return this.http.get(`/crossroads-users/${viewerUserId}/leaderboard/${type}`);
    }
}
exports.CrossroadsUsersApi = CrossroadsUsersApi;
//# sourceMappingURL=index.js.map