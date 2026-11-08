import { HttpClient } from "../httpClient.js";
import { Tag } from "../projects/types.js";
/** The curated gameplay tag list. Featured tags (max 15) are the forum tag set. */
export declare class TagsApi {
    private http;
    constructor(http: HttpClient);
    /** All tags by name, each with projects_count. */
    list(): Promise<Tag[]>;
    create(payload: {
        name: string;
        featured?: boolean;
    }): Promise<Tag>;
    update(id: number, payload: {
        name?: string;
        featured?: boolean;
    }): Promise<Tag>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map