"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VettingApi = void 0;
/**
 * Community Vetting cycle. Every write takes the lease token (409 unless it is the current lease);
 * the exceptions are updateSettings (the kill switch) and the lease calls.
 */
class VettingApi {
    constructor(http) {
        this.http = http;
    }
    getSettings() {
        return this.http.get("/vetting/settings");
    }
    updateSettings(payload) {
        return this.http.put("/vetting/settings", payload);
    }
    /** 409 (ApiError.data = {holder, expires_at}) when someone else holds the lease. */
    acquireLease(holder, ttlSeconds) {
        return this.http.post("/vetting/lease", { holder, ttl_seconds: ttlSeconds });
    }
    /** 409 when the lease is lost. */
    renewLease(token, ttlSeconds) {
        return this.http.put("/vetting/lease", { token, ttl_seconds: ttlSeconds });
    }
    releaseLease(token) {
        return this.http.post("/vetting/lease/release", { token });
    }
    current() {
        return this.http.get("/vetting/current");
    }
    cycles(limit = 3) {
        return this.http.get(`/vetting/cycles?limit=${limit}`);
    }
    cycleByWeek(weekOf) {
        return this.http.get(`/vetting/cycles?week_of=${weekOf}`).then(r => r[0] ?? null);
    }
    /** firstOrCreate. */
    createCycle(leaseToken, weekOf) {
        return this.http.post("/vetting/cycles", { week_of: weekOf, lease_token: leaseToken });
    }
    updateCycle(leaseToken, cycleId, fields) {
        return this.http.put(`/vetting/cycles/${cycleId}`, { ...fields, lease_token: leaseToken });
    }
    setStep(leaseToken, cycleId, step, status, extra = {}) {
        return this.http.post(`/vetting/cycles/${cycleId}/steps/${step}`, { status, ...extra, lease_token: leaseToken });
    }
    closeCycle(leaseToken, cycleId, payload) {
        return this.http.post(`/vetting/cycles/${cycleId}/close`, { ...payload, lease_token: leaseToken });
    }
    startCycle(leaseToken, cycleId, projectId, from) {
        return this.http.post(`/vetting/cycles/${cycleId}/start`, { project_id: projectId, from, lease_token: leaseToken });
    }
    deleteCycle(leaseToken, cycleId) {
        return this.http.post(`/vetting/cycles/${cycleId}/delete`, { lease_token: leaseToken });
    }
    /** Compare-and-set; 409 (ApiError.data.vetting_thread_id = current) when `expected` is stale. */
    setThread(leaseToken, projectId, threadId, expected) {
        return this.http.put(`/vetting/projects/${projectId}/thread`, { thread_id: threadId, expected, lease_token: leaseToken });
    }
    /** Removes what a rehearsal created: context-keyed XP of one user and game nobody attended. Lease-fenced. */
    testCleanup(leaseToken, payload) {
        return this.http.post("/vetting/test-cleanup", { ...payload, lease_token: leaseToken });
    }
    cancel(leaseToken, projectId, to) {
        return this.http.post("/vetting/cancel", { project_id: projectId, to, lease_token: leaseToken });
    }
}
exports.VettingApi = VettingApi;
__exportStar(require("./types.js"), exports);
//# sourceMappingURL=index.js.map