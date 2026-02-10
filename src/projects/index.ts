import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import {
    CreateProjectPayload,
    Project,
    ProjectAttachment,
    ProjectLink,
    ProjectStaff,
    UpdateProjectPayload,
} from "./types";

export class ProjectsApi {
    constructor(private http: HttpClient) { }

    // Projects
    list(): Promise<Project[]> {
        return this.http.get<Project[]>("/projects");
    }

    create(project: CreateProjectPayload): Promise<Project> {
        return this.http.post<Project>("/projects", project);
    }

    async getById(id: number): Promise<Project | null> {
        try {
            return await this.http.get<Project>(`/projects/${id}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    async getByName(name: string): Promise<Project | null> {
        try {
            return await this.http.get<Project>(`/projects/by-name/${name}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    async getByGuild(name: string): Promise<Project | null> {
        try {
            return await this.http.get<Project>(`/projects/by-guild/${name}`);
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

    update(id: number, payload: UpdateProjectPayload): Promise<Project> {
        return this.http.put<Project>(`/projects/${id}`, payload);
    }

    delete(id: number): Promise<boolean> {
        return this.http.delete(`/projects/${id}`);
    }

    // Staff
    listStaff(projectId: number): Promise<ProjectStaff[]> {
        return this.http.get<ProjectStaff[]>(`/projects/${projectId}/staff`);
    }

    addStaff(projectId: number, userId: number, role: string): Promise<ProjectStaff> {
        return this.http.post<ProjectStaff>(`/projects/${projectId}/staff`, { userId, role });
    }

    removeStaff(projectId: number, userId: number): Promise<boolean> {
        return this.http.delete(`/projects/${projectId}/staff/${userId}`);
    }

    // Attachments
    addAttachment(projectId: number, attachment: Omit<ProjectAttachment, "id">): Promise<ProjectAttachment> {
        return this.http.post<ProjectAttachment>(`/projects/${projectId}/attachments`, attachment);
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