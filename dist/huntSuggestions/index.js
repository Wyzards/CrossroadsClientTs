"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuntSuggestionsApi = void 0;
class HuntSuggestionsApi {
    constructor(http) {
        this.http = http;
    }
    /**
     * Creates the hidden, public, released server project in the Hunt queue (one transaction).
     * 409 (ApiError.data.message) when the post was already approved or a project with the same slug exists.
     */
    approve(payload) {
        return this.http.post("/hunt-suggestions", payload);
    }
}
exports.HuntSuggestionsApi = HuntSuggestionsApi;
//# sourceMappingURL=index.js.map