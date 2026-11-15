import { HttpClient } from "../httpClient.js";
import { Project } from "../projects/types.js";
import { CloseCyclePayload, CurrentVettingProject, CycleWriteOnce, Lease, VettingCycle, VettingSettings, VettingSettingsUpdate, VettingStepName, VettingStepStatus, StartFrom, TestCleanupPayload, TestCleanupResult } from "./types.js";
/**
 * Community Vetting cycle. Every write takes the lease token (409 unless it is the current lease);
 * the exceptions are updateSettings (the kill switch) and the lease calls.
 */
export declare class VettingApi {
    private http;
    constructor(http: HttpClient);
    getSettings(): Promise<VettingSettings>;
    updateSettings(payload: VettingSettingsUpdate): Promise<VettingSettings>;
    /** 409 (ApiError.data = {holder, expires_at}) when someone else holds the lease. */
    acquireLease(holder: string, ttlSeconds: number): Promise<Lease>;
    /** 409 when the lease is lost. */
    renewLease(token: string, ttlSeconds: number): Promise<Lease>;
    releaseLease(token: string): Promise<void>;
    current(): Promise<CurrentVettingProject[]>;
    cycles(limit?: number): Promise<VettingCycle[]>;
    cycleByWeek(weekOf: string): Promise<VettingCycle | null>;
    /** firstOrCreate. */
    createCycle(leaseToken: string, weekOf: string): Promise<VettingCycle>;
    updateCycle(leaseToken: string, cycleId: number, fields: CycleWriteOnce): Promise<VettingCycle>;
    setStep(leaseToken: string, cycleId: number, step: VettingStepName, status: VettingStepStatus, extra?: {
        note?: string | null;
        next_attempt_at?: string | null;
    }): Promise<VettingCycle>;
    closeCycle(leaseToken: string, cycleId: number, payload: CloseCyclePayload): Promise<VettingCycle>;
    startCycle(leaseToken: string, cycleId: number, projectId: number, from: StartFrom): Promise<VettingCycle>;
    deleteCycle(leaseToken: string, cycleId: number): Promise<void>;
    /** Compare-and-set; 409 (ApiError.data.vetting_thread_id = current) when `expected` is stale. */
    setThread(leaseToken: string, projectId: number, threadId: string | null, expected: string | null): Promise<{
        id: number;
        vetting_thread_id: string | null;
    }>;
    /** Removes what a rehearsal created: context-keyed XP of one user and game nobody attended. Lease-fenced. */
    testCleanup(leaseToken: string, payload: TestCleanupPayload): Promise<TestCleanupResult>;
    cancel(leaseToken: string, projectId: number, to: "vetting_queue" | "unvetted"): Promise<Project>;
}
export * from "./types.js";
//# sourceMappingURL=index.d.ts.map