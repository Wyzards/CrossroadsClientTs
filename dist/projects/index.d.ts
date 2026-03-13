import FormData from "form-data";
import { HttpClient } from "../httpClient.js";
import { CreateProjectPayload, Project, ProjectLink, ProjectStaff, ProjectStaffRank, UpdateProjectPayload } from "./types";
export declare class ProjectsApi {
    private http;
    constructor(http: HttpClient);
    list(): Promise<Project[]>;
    create(project: CreateProjectPayload): Promise<Project>;
    getById(id: number): Promise<Project | null>;
    getByName(name: string): Promise<Project | null>;
    getByGuild(name: string): Promise<Project | null>;
    existsByName(name: string): Promise<{
        exists: boolean;
    }>;
    existsByGuild(guildId: string): Promise<{
        exists: boolean;
    }>;
    update(id: number, payload: UpdateProjectPayload): Promise<Project>;
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