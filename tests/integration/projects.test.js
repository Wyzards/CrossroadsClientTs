"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// projectsApi.integration.test.ts
const index_1 = require("../../src/projects/index");
const index_2 = require("../../src/users/index");
const httpClient_1 = require("../../src/httpClient");
const baseUrl = "127.0.0.1:8000/api";
const token = "token";
const badToken = "invalidToken";
describe("ProjectsApi Integration", () => {
    let http;
    let projectsApi;
    let usersApi;
    let authToken;
    let testUserId;
    beforeAll(async () => {
        // create a real HttpClient pointing at your test API server
        http = new httpClient_1.HttpClient(baseUrl, token);
        projectsApi = new index_1.ProjectsApi(http);
        usersApi = new index_2.CrossroadsUsersApi(http);
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
        const projectPayload = { name: "Integration Test Project" };
        const project = await projectsApi.create(projectPayload);
        expect(project.name).toBe(projectPayload.name);
        // 2️⃣ Verify project via GET
        const fetched = await projectsApi.get(project.id);
        expect(fetched.id).toBe(project.id);
        expect(fetched.name).toBe(projectPayload.name);
        // 3️⃣ Add staff
        const staff = await projectsApi.addStaff(project.id, testUserId, "manager");
        expect(staff.userId).toBe(testUserId);
        let staffList = await projectsApi.listStaff(project.id);
        expect(staffList).toHaveLength(1);
        // 4️⃣ Add attachment
        const attachment = await projectsApi.addAttachment(project.id, { name: "file.pdf" });
        let attachments = await projectsApi.listAttachments(project.id);
        expect(attachments).toHaveLength(1);
        // 5️⃣ Add link
        const link = await projectsApi.addLink(project.id, { url: "http://example.com" });
        let links = await projectsApi.listLinks(project.id);
        expect(links).toHaveLength(1);
        // 6️⃣ Update project
        const updatedPayload = { name: "Updated Project" };
        const updated = await projectsApi.update(project.id, updatedPayload);
        expect(updated.name).toBe(updatedPayload.name);
        // 7️⃣ Delete project
        const deleted = await projectsApi.delete(project.id);
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
        const invalidPayload = {}; // Missing required fields
        await expect(projectsApi.create(invalidPayload)).rejects.toThrow("ValidationError");
    });
    test("Get non-existent project returns NotFoundError", async () => {
        await expect(projectsApi.get(999999)).rejects.toThrow("NotFoundError");
    });
    test("Update non-existent project returns NotFoundError", async () => {
        const payload = { name: "Should Fail" };
        await expect(projectsApi.update(999999, payload)).rejects.toThrow("NotFoundError");
    });
    test("Delete non-existent project returns NotFoundError", async () => {
        await expect(projectsApi.delete(999999)).rejects.toThrow("NotFoundError");
    });
    test("Authorization required for all endpoints", async () => {
        const httpNoAuth = new httpClient_1.HttpClient(baseUrl, badToken);
        const projectsNoAuth = new index_1.ProjectsApi(httpNoAuth);
        await expect(projectsNoAuth.list()).rejects.toThrow("UnauthorizedError");
        await expect(projectsNoAuth.create({ name: "NoAuth" })).rejects.toThrow("UnauthorizedError");
    });
});
//# sourceMappingURL=projects.test.js.map