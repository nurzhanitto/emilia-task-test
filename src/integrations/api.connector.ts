import axios from "axios";
import { api } from "../constants";
import { UserResponse } from "../types/api";

class ApiConnector {
    public async getUsers(): Promise<UserResponse> {
        const path = `users`;
        return await this.call({ path });
    }

    public async getUsersWithPagination(skip: number, limit: number): Promise<UserResponse> {
        const path = `users?skip=${skip}&limit=${limit}`;
        return await this.call({ path });
    }

    private async call<Request, Response>(
        { path, method = 'get', body }: { path: string, method?: string, body?: Request }
    ): Promise<Response> {
        try {
            const { data } = await axios(api.base + path, { method, data: body });
            return data;
        } 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (e: any) {
            throw new Error(e)
        }
    }
}

export const apiConnector = new ApiConnector()
