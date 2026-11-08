import FormData from "form-data";
import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import {
    CreateProjectPayload,
    Project,
    ProjectFile,
    ProjectLink,
    ProjectStaff,
    ProjectStaffRank,
    ProjectWithRelations,
    UpdateProjectPayload
} from "./types";
import { FilterGroup } from "../types/filter.js";

export class ProjectsApi {
    constructor(private http: HttpClient) { }

    // Projects
    list(): Promise<ProjectWithRelations[]> {
        return this.http.get<ProjectWithRelations[]>("/projects");
    }


    search(filter: FilterGroup): Promise<ProjectWithRelations[]> {
        return this.http.post<ProjectWithRelations[]>("/projects/search", { filter });
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

    // Attachments (files are set through sections and the banner)
    removeAttachment(projectId: number, attachmentId: number): Promise<boolean> {
        return this.http.delete(`/projects/${projectId}/attachments/${attachmentId}`);
    }

    // Content: tags, sections, banner, files

    /** Replaces the tags. primary: up to 3 names, in order. Unknown names are refused (422). */
    setTags(projectId: number, tags: { primary: string[], secondary: string[] }): Promise<ProjectWithRelations> {
        return this.http.put<ProjectWithRelations>(`/projects/${projectId}/tags`, tags);
    }

    addSection(projectId: number, text: string | null): Promise<ProjectWithRelations> {
        return this.http.post<ProjectWithRelations>(`/projects/${projectId}/sections`, { text });
    }

    updateSection(projectId: number, sectionId: number, text: string | null): Promise<ProjectWithRelations> {
        return this.http.put<ProjectWithRelations>(`/projects/${projectId}/sections/${sectionId}`, { text });
    }

    deleteSection(projectId: number, sectionId: number): Promise<ProjectWithRelations> {
        return this.http.delete<ProjectWithRelations>(`/projects/${projectId}/sections/${sectionId}`);
    }

    /** Replaces a section's files with the FormData's files[] (none clears them). */
    setSectionFiles(projectId: number, sectionId: number, formData: FormData): Promise<ProjectWithRelations> {
        return this.http.post<ProjectWithRelations>(`/projects/${projectId}/sections/${sectionId}/files`, formData,
            { headers: formData.getHeaders(), maxBodyLength: Infinity });
    }

    /** Replaces the banner with the FormData's `file` (an image). */
    setBanner(projectId: number, formData: FormData): Promise<ProjectWithRelations> {
        return this.http.post<ProjectWithRelations>(`/projects/${projectId}/banner`, formData,
            { headers: formData.getHeaders(), maxBodyLength: Infinity });
    }

    deleteBanner(projectId: number): Promise<ProjectWithRelations> {
        return this.http.delete<ProjectWithRelations>(`/projects/${projectId}/banner`);
    }

    /** Every attachment with its id and file name, so it can be placed in the right message. */
    files(projectId: number): Promise<ProjectFile[]> {
        return this.http.get<{ id: number, name: string, data: string }[]>(`/projects/${projectId}/files`)
            .then(files => files.map(f => ({ id: f.id, name: f.name, data: Buffer.from(f.data, "base64") })));
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