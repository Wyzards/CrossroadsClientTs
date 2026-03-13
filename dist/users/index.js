"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossroadsUsersApi = void 0;
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
    findByMinecraftUuid(uuid) {
        return this.http.get(`/crossroads-users/minecraft/${uuid}`);
    }
    findByDiscordId(discordId) {
        return this.http.get(`/crossroads-users/discord/${discordId}`);
    }
}
exports.CrossroadsUsersApi = CrossroadsUsersApi;
//# sourceMappingURL=index.js.map