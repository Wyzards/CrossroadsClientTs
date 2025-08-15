import { AxiosInstance } from "axios";
import {
    Project,
    CreateProjectPayload,
    ProjectStaff,
    ProjectAttachment,
    ProjectLink,
    UpdateProjectPayload,
} from "./types";

export class ProjectsApi {
    constructor(private http: AxiosInstance) { }

    list() {
        return this.http.get<Project[]>(`/projects`);
    }

    create(payload: CreateProjectPayload) {
        return this.http.post<Project>(`/projects`, payload);
    }

    get(id: number) {
        return this.http.get<Project>(`/projects/${id}`);
    }

    update(id: number, payload: UpdateProjectPayload) {
        return this.http.put<Project>(`/projects/${id}`, payload);
    }

    delete(id: number) {
        return this.http.delete(`/projects/${id}`);
    }

    // Staff
    listStaff(projectId: number) {
        return this.http.get<ProjectStaff[]>(`/projects/${projectId}/staff`);
    }

    addStaff(projectId: number, userId: number, role: string) {
        return this.http.post(`/projects/${projectId}/staff`, { userId, role });
    }

    removeStaff(projectId: number, userId: number) {
        return this.http.delete(`/projects/${projectId}/staff/${userId}`);
    }

    // Attachments
    listAttachments(projectId: number) {
        return this.http.get<ProjectAttachment[]>(`/projects/${projectId}/attachments`);
    }

    addAttachment(projectId: number, attachment: Omit<ProjectAttachment, "id">) {
        return this.http.post(`/projects/${projectId}/attachments`, attachment);
    }

    removeAttachment(projectId: number, attachmentId: number) {
        return this.http.delete(`/projects/${projectId}/attachments/${attachmentId}`);
    }

    // Links
    listLinks(projectId: number) {
        return this.http.get<ProjectLink[]>(`/projects/${projectId}/links`);
    }

    addLink(projectId: number, link: Omit<ProjectLink, "id">) {
        return this.http.post(`/projects/${projectId}/links`, link);
    }

    removeLink(projectId: number, linkId: number) {
        return this.http.delete(`/projects/${projectId}/links/${linkId}`);
    }
}