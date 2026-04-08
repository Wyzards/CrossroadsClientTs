import FormData from "form-data";
import { HttpClient } from "../httpClient.js";
import { CreateProjectPayload, ProjectLink, ProjectStaff, ProjectStaffRank, ProjectWithRelations, UpdateProjectPayload } from "./types";
export declare class ProjectsApi {
    private http;
    constructor(http: HttpClient);
    list(): Promise<ProjectWithRelations[]>;
    create(project: CreateProjectPayload): Promise<ProjectWithRelations>;
    getById(id: number): Promise<ProjectWithRelations | null>;
    getByName(name: string): Promise<ProjectWithRelations | null>;
    getByGuild(name: string): Promise<ProjectWithRelations | null>;
    existsByName(name: string): Promise<{
        exists: boolean;
    }>;
    existsByGuild(guildId: string): Promise<{
        exists: boolean;
    }>;
    update(id: number, payload: UpdateProjectPayload): Promise<ProjectWithRelations>;
    delete(id: number): Promise<boolean>;
    listStaff(projectId: number): Promise<ProjectStaff[]>;
    setStaff(projectId: number, crossroadsUserId: number, rank: ProjectStaffRank): Promise<ProjectStaff>;
    removeStaff(projectId: number, crossroadsUserId: number): Promise<boolean>;
    setAttachments(projectId: number, formData: FormData): Promise<any[]>;
    downloadAllAttachments(projectId: number): Promise<Buffer[]>;
    removeAttachment(projectId: number, attachmentId: number): Promise<boolean>;
    listLinks(projectId: number): Promise<ProjectLink[]>;
    addLink(projectId: number, link: Omit<ProjectLink, "id">): Promise<ProjectLink>;
    removeLink(projectId: number, linkId: number): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map