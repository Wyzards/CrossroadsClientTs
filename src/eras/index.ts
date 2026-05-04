import { NotFoundError } from "../error.js";
import { HttpClient } from "../httpClient.js";
import { Era } from "./type.js";

export class ErasApi {
    constructor(private http: HttpClient) { }

    async getEras(): Promise<Era[]> {
        return this.http.get<Era[]>(`/eras`);
    }

    async getEra(id: number): Promise<Era | null> {
        try {
            return await this.http.get<Era>(`/eras/${id}`);
        } catch (err) {
            if (err instanceof NotFoundError) return null;
            throw err;
        }
    }

    createEra(data: { name: string, role_id: string }): Promise<Era> {
        return this.http.post<Era>(`/eras`, data);
    }

    updateEra(id: number, data: Partial<{ name: string, role_id: string | null }>): Promise<Era> {
        return this.http.put(`/eras/${id}`, data);
    }

    activateEra(id: number): Promise<Era> {
        return this.http.post<Era>(`/eras/${id}/activate`, {});
    }
}