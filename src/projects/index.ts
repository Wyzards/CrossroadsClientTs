import FormData from "form-data";
import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import {
    CreateProjectPayload,
    ProjectLink,
    ProjectStaff,
    ProjectStaffRank,
    ProjectWithRelations,
    UpdateProjectPayload
} from "./types";

export class ProjectsApi {
    constructor(private http: HttpClient) { }

    // Projects
    list(): Promise<ProjectWithRelations[]> {
        return this.http.get<ProjectWithRelations[]>("/projects");
    }

    create(project: CreateProjectPayload): Promise<ProjectWithRelations> {
        return this.http.post<ProjectWithRelations>("/projects", project);
    }

    async getById(id: number): Promise<ProjectWithRelations | null> {
        try {
            return await this.http.get<ProjectWithRelations>(`/projects/${id}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    async getByName(name: string): Promise<ProjectWithRelations | null> {
        try {
            return await this.http.get<ProjectWithRelations>(`/projects/by-name/${name}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    async getByGuild(name: string): Promise<ProjectWithRelations | null> {
        try {
            return await this.http.get<ProjectWithRelations>(`/projects/by-guild/${name}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    existsByName(name: string): Promise<{ exists: boolean }> {
        return this.http.get<{ exists: boolean }>(`/projects/exists/by-name/${name}`);
    }

    existsByGuild(guildId: string): Promise<{ exists: boolean }> {
        return this.http.get<{ exists: boolean }>(`/projects/exists/by-guild/${guildId}`);
    }

    update(id: number, payload: UpdateProjectPayload): Promise<ProjectWithRelations> {
        return this.http.put<ProjectWithRelations>(`/projects/${id}`, payload);
    }

    delete(id: number): Promise<boolean> {
        return this.http.delete(`/projects/${id}`);
    }

    // Staff
    listStaff(projectId: number): Promise<ProjectStaff[]> {
        return this.http.get<ProjectStaff[]>(`/projects/${projectId}/staff`);
    }

    setStaff(projectId: number, crossroadsUserId: number, rank: ProjectStaffRank): Promise<ProjectStaff> {
        return this.http.put<ProjectStaff>(`/projects/${projectId}/staff/${crossroadsUserId}`, { rank });
    }

    removeStaff(projectId: number, crossroadsUserId: number): Promise<boolean> {
        return this.http.delete(`/projects/${projectId}/staff/${crossroadsUserId}`);
    }

    // Attachments
    async setAttachments(projectId: number, formData: FormData): Promise<any[]> {
        // Just send the FormData to Laravel
        return this.http.post<any[]>(
            `/projects/${projectId}/attachments`,
            formData,
            {
                headers: formData.getHeaders(),
                maxBodyLength: Infinity, // allow large files
            }
        );
    }

    downloadAllAttachments(projectId: number): Promise<Buffer[]> {
        return this.http.get<string[]>(
            `/projects/${projectId}/attachments/download`
        ).then(data => data.map(b64 => Buffer.from(b64, "base64")));
    }

    removeAttachment(projectId: number, attachmentId: number): Promise<boolean> {
        return this.http.delete(`/projects/${projectId}/attachments/${attachmentId}`);
    }

    // Links
    listLinks(projectId: number): Promise<ProjectLink[]> {
        return this.http.get<ProjectLink[]>(`/projects/${projectId}/links`);
    }

    addLink(projectId: number, link: Omit<ProjectLink, "id">): Promise<ProjectLink> {
        return this.http.post<ProjectLink>(`/projects/${projectId}/links`, link);
    }

    removeLink(projectId: number, linkId: number): Promise<boolean> {
        return this.http.delete(`/projects/${projectId}/links/${linkId}`);
    }

}