import FormData from "form-data";
import { HttpClient } from "../httpClient.js";
import { CreateProjectPayload, ProjectFile, ProjectLink, ProjectStaff, ProjectStaffRank, ProjectWithRelations, UpdateProjectPayload } from "./types";
import { FilterGroup } from "../types/filter.js";
export declare class ProjectsApi {
    private http;
    constructor(http: HttpClient);
    list(): Promise<ProjectWithRelations[]>;
    search(filter: FilterGroup): Promise<ProjectWithRelations[]>;
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
    removeAttachment(projectId: number, attachmentId: number): Promise<boolean>;
    /** Replaces the tags. primary: up to 3 names, in order. Unknown names are refused (422). */
    setTags(projectId: number, tags: {
        primary: string[];
        secondary: string[];
    }): Promise<ProjectWithRelations>;
    addSection(projectId: number, text: string | null): Promise<ProjectWithRelations>;
    updateSection(projectId: number, sectionId: number, text: string | null): Promise<ProjectWithRelations>;
    deleteSection(projectId: number, sectionId: number): Promise<ProjectWithRelations>;
    /** Replaces a section's files with the FormData's files[] (none clears them). */
    setSectionFiles(projectId: number, sectionId: number, formData: FormData): Promise<ProjectWithRelations>;
    /** Replaces the banner with the FormData's `file` (an image). */
    setBanner(projectId: number, formData: FormData): Promise<ProjectWithRelations>;
    deleteBanner(projectId: number): Promise<ProjectWithRelations>;
    /** Every attachment with its id and file name, so it can be placed in the right message. */
    files(projectId: number): Promise<ProjectFile[]>;
    listLinks(projectId: number): Promise<ProjectLink[]>;
    addLink(projectId: number, link: Omit<ProjectLink, "id">): Promise<ProjectLink>;
    removeLink(projectId: number, linkId: number): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map