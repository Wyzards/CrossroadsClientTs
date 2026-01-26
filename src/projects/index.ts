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

    getById(id: number): Promise<Project> {
        return this.http.get<Project>(`/projects/${id}`);
    }

    getByName(name: string): Promise<Project> {
        return this.http.get<Project>(`/projects/by-name/${name}`);
    }

    getByGuild(name: string): Promise<Project> {
        return this.http.get<Project>(`/projects/by-guild/${name}`);
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
    listAttachments(projectId: number): Promise<ProjectAttachment[]> {
        return this.http.get<ProjectAttachment[]>(`/projects/${projectId}/attachments`);
    }

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