"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapsApi = void 0;
class MapsApi {
    constructor(http) {
        this.http = http;
    }
    getByImageName(imageName) {
        return this.http.get(`/maps/by-image-name/${imageName}`);
    }
    deleteByImageName(imageName) {
        return this.http.delete(`/maps/by-image-name/${imageName}`);
    }
    list() {
        return this.http.get(`/maps`);
    }
    create(payload) {
        return this.http.post(`/maps`, payload);
    }
    get(id) {
        return this.http.get(`/maps/${id}`);
    }
}
exports.MapsApi = MapsApi;
//# sourceMappingURL=index.js.map