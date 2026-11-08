import { HttpClient } from "../httpClient.js";
import { AcceptResult, AcceptRoute, Application, ApplicationContent, ApplicationDetail, ApplicationFile, ApplicationFileData, ApplicationRelationship, ApplicationStatus } from "./types.js";
/**
 * Project applications. Editing is allowed while draft or submitted; submit/accept/reject answer
 * 409 when the state or revision is stale and 422 when content is incomplete or a route isn't allowed.
 */
export declare class ApplicationsApi {
    private http;
    constructor(http: HttpClient);
    list(filter?: {
        applicant?: string;
        status?: ApplicationStatus[];
        thread_id?: string;
        review_thread_id?: string;
    }): Promise<Application[]>;
    get(id: number): Promise<ApplicationDetail | null>;
    create(applicantDiscordId: string, relationship: ApplicationRelationship): Promise<ApplicationDetail>;
    /** Discord bookkeeping (thread, card message, review thread). */
    update(id: number, payload: {
        thread_id?: string | null;
        card_message_id?: string | null;
        review_thread_id?: string | null;
    }): Promise<ApplicationDetail>;
    setWorking(id: number, working: ApplicationContent): Promise<ApplicationDetail>;
    /** One image or video (10 MB). Reference the returned id from sections or banner_file_id. */
    addFile(id: number, file: Buffer, name: string, contentType: string): Promise<ApplicationFile>;
    files(id: number, ids?: number[]): Promise<ApplicationFileData[]>;
    submit(id: number): Promise<ApplicationDetail>;
    withdraw(id: number): Promise<ApplicationDetail>;
    accept(id: number, revision: number, route: AcceptRoute, reviewerDiscordId: string): Promise<AcceptResult>;
    reject(id: number, revision: number, reason: string, allowResubmit: boolean, reviewerDiscordId: string): Promise<ApplicationDetail>;
}
//# sourceMappingURL=index.d.ts.map