// projectsApi.integration.test.ts
import { ProjectsApi } from "../../src/projects/index";
import { CrossroadsUsersApi } from "../../src/users/index";
import { HttpClient } from "../../src/httpClient";
import { Project, ProjectStaff, ProjectAttachment, ProjectLink, CreateProjectPayload, UpdateProjectPayload } from "../../src/projects/types";

const baseUrl = "127.0.0.1:8000/api";
const token = "token";
const badToken = "invalidToken";

describe("ProjectsApi Integration", () => {
    let http: HttpClient;
    let projectsApi: ProjectsApi;
    let usersApi: CrossroadsUsersApi;
    let authToken: string;
    let testUserId: number;

    beforeAll(async () => {
        // create a real HttpClient pointing at your test API server
        http = new HttpClient(baseUrl, token);
        projectsApi = new ProjectsApi(http);
        usersApi = new CrossroadsUsersApi(http);

        // create a user that we can attach to projects
        const user = await usersApi.create({ discordId: "123456789" });
        testUserId = user.id;
    });

    afterAll(async () => {
        // Optionally clean up users if your DB doesn't auto-reset
        await usersApi.delete(testUserId);
    });

    test("Full CRUD with staff, attachments, and links", async () => {
        // 1️⃣ Create project
        const projectPayload: CreateProjectPayload = { name: "Integration Test Project" };
        const project: Project = await projectsApi.create(projectPayload);
        expect(project.name).toBe(projectPayload.name);

        // 2️⃣ Verify project via GET
        const fetched: Project = await projectsApi.get(project.id);
        expect(fetched.id).toBe(project.id);
        expect(fetched.name).toBe(projectPayload.name);

        // 3️⃣ Add staff
        const staff: ProjectStaff = await projectsApi.addStaff(project.id, testUserId, "manager");
        expect(staff.userId).toBe(testUserId);
        let staffList: ProjectStaff[] = await projectsApi.listStaff(project.id);
        expect(staffList).toHaveLength(1);

        // 4️⃣ Add attachment
        const attachment: ProjectAttachment = await projectsApi.addAttachment(project.id, { name: "file.pdf" });
        let attachments: ProjectAttachment[] = await projectsApi.listAttachments(project.id);
        expect(attachments).toHaveLength(1);

        // 5️⃣ Add link
        const link: ProjectLink = await projectsApi.addLink(project.id, { url: "http://example.com" });
        let links: ProjectLink[] = await projectsApi.listLinks(project.id);
        expect(links).toHaveLength(1);

        // 6️⃣ Update project
        const updatedPayload: UpdateProjectPayload = { name: "Updated Project" };
        const updated: Project = await projectsApi.update(project.id, updatedPayload);
        expect(updated.name).toBe(updatedPayload.name);

        // 7️⃣ Delete project
        const deleted: boolean = await projectsApi.delete(project.id);
        expect(deleted).toBe(true);

        // 8️⃣ Verify cascading deletes
        await expect(projectsApi.get(project.id)).rejects.toThrow("NotFoundError");
        const staffAfterDelete = await projectsApi.listStaff(project.id);
        expect(staffAfterDelete).toHaveLength(0);
        const attachmentsAfterDelete = await projectsApi.listAttachments(project.id);
        expect(attachmentsAfterDelete).toHaveLength(0);
        const linksAfterDelete = await projectsApi.listLinks(project.id);
        expect(linksAfterDelete).toHaveLength(0);
    });

    test("Create project with invalid payload returns ValidationError", async () => {
        const invalidPayload: any = {}; // Missing required fields
        await expect(projectsApi.create(invalidPayload)).rejects.toThrow("ValidationError");
    });

    test("Get non-existent project returns NotFoundError", async () => {
        await expect(projectsApi.get(999999)).rejects.toThrow("NotFoundError");
    });

    test("Update non-existent project returns NotFoundError", async () => {
        const payload: UpdateProjectPayload = { name: "Should Fail" };
        await expect(projectsApi.update(999999, payload)).rejects.toThrow("NotFoundError");
    });

    test("Delete non-existent project returns NotFoundError", async () => {
        await expect(projectsApi.delete(999999)).rejects.toThrow("NotFoundError");
    });

    test("Authorization required for all endpoints", async () => {
        const httpNoAuth = new HttpClient(baseUrl, badToken);
        const projectsNoAuth = new ProjectsApi(httpNoAuth);

        await expect(projectsNoAuth.list()).rejects.toThrow("UnauthorizedError");
        await expect(projectsNoAuth.create({ name: "NoAuth" })).rejects.toThrow("UnauthorizedError");
    });
});