import { Company } from "./company.interface";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    email_verified_at?: string;
    companies?: Company;
    permission?: string;
    created_at: string;
    updated_at: string;
}
