import { HttpClient } from "../httpClient.js";
import { Tag } from "../projects/types.js";

/** The curated gameplay tag list. Featured tags (max 15) are the forum tag set. */
export class TagsApi {
    constructor(private http: HttpClient) { }

    /** All tags by name, each with projects_count. */
    list(): Promise<Tag[]> {
        return this.http.get<Tag[]>("/tags");
    }

    create(payload: { name: string, featured?: boolean }): Promise<Tag> {
        return this.http.post<Tag>("/tags", payload);
    }

    update(id: number, payload: { name?: string, featured?: boolean }): Promise<Tag> {
        return this.http.put<Tag>(`/tags/${id}`, payload);
    }

    delete(id: number): Promise<void> {
        return this.http.delete(`/tags/${id}`);
    }
}
