import { HttpClient } from "../httpClient.js";
import { Project } from "../projects/types.js";
import {
    CloseCyclePayload, CurrentVettingProject, CycleWriteOnce, Lease, VettingCycle,
    VettingSettings, VettingSettingsUpdate, VettingStepName, VettingStepStatus, StartFrom,
} from "./types.js";

/**
 * Community Vetting cycle. Every write takes the lease token (409 unless it is the current lease);
 * the exceptions are updateSettings (the kill switch) and the lease calls.
 */
export class VettingApi {
    constructor(private http: HttpClient) { }

    getSettings(): Promise<VettingSettings> {
        return this.http.get<VettingSettings>("/vetting/settings");
    }

    updateSettings(payload: VettingSettingsUpdate): Promise<VettingSettings> {
        return this.http.put<VettingSettings>("/vetting/settings", payload);
    }

    /** 409 (ApiError.data = {holder, expires_at}) when someone else holds the lease. */
    acquireLease(holder: string, ttlSeconds: number): Promise<Lease> {
        return this.http.post<Lease>("/vetting/lease", { holder, ttl_seconds: ttlSeconds });
    }

    /** 409 when the lease is lost. */
    renewLease(token: string, ttlSeconds: number): Promise<Lease> {
        return this.http.put<Lease>("/vetting/lease", { token, ttl_seconds: ttlSeconds });
    }

    releaseLease(token: string): Promise<void> {
        return this.http.post<void>("/vetting/lease/release", { token });
    }

    current(): Promise<CurrentVettingProject[]> {
        return this.http.get<CurrentVettingProject[]>("/vetting/current");
    }

    cycles(limit = 3): Promise<VettingCycle[]> {
        return this.http.get<VettingCycle[]>(`/vetting/cycles?limit=${limit}`);
    }

    cycleByWeek(weekOf: string): Promise<VettingCycle | null> {
        return this.http.get<VettingCycle[]>(`/vetting/cycles?week_of=${weekOf}`).then(r => r[0] ?? null);
    }

    /** firstOrCreate. */
    createCycle(leaseToken: string, weekOf: string): Promise<VettingCycle> {
        return this.http.post<VettingCycle>("/vetting/cycles", { week_of: weekOf, lease_token: leaseToken });
    }

    updateCycle(leaseToken: string, cycleId: number, fields: CycleWriteOnce): Promise<VettingCycle> {
        return this.http.put<VettingCycle>(`/vetting/cycles/${cycleId}`, { ...fields, lease_token: leaseToken });
    }

    setStep(leaseToken: string, cycleId: number, step: VettingStepName, status: VettingStepStatus,
        extra: { note?: string | null, next_attempt_at?: string | null } = {}): Promise<VettingCycle> {
        return this.http.post<VettingCycle>(`/vetting/cycles/${cycleId}/steps/${step}`, { status, ...extra, lease_token: leaseToken });
    }

    closeCycle(leaseToken: string, cycleId: number, payload: CloseCyclePayload): Promise<VettingCycle> {
        return this.http.post<VettingCycle>(`/vetting/cycles/${cycleId}/close`, { ...payload, lease_token: leaseToken });
    }

    startCycle(leaseToken: string, cycleId: number, projectId: number, from: StartFrom): Promise<VettingCycle> {
        return this.http.post<VettingCycle>(`/vetting/cycles/${cycleId}/start`, { project_id: projectId, from, lease_token: leaseToken });
    }

    deleteCycle(leaseToken: string, cycleId: number): Promise<void> {
        return this.http.post<void>(`/vetting/cycles/${cycleId}/delete`, { lease_token: leaseToken });
    }

    /** Compare-and-set; 409 (ApiError.data.vetting_thread_id = current) when `expected` is stale. */
    setThread(leaseToken: string, projectId: number, threadId: string | null, expected: string | null): Promise<{ id: number, vetting_thread_id: string | null }> {
        return this.http.put(`/vetting/projects/${projectId}/thread`, { thread_id: threadId, expected, lease_token: leaseToken });
    }

    cancel(leaseToken: string, projectId: number, to: "vetting_queue" | "unvetted"): Promise<Project> {
        return this.http.post<Project>("/vetting/cancel", { project_id: projectId, to, lease_token: leaseToken });
    }
}

export * from "./types.js";
