import { Message } from '@core/interfaces/message.interface';

export interface Task {
    id?: number;
    name: string;
    description: string;
    is_done?: boolean;
    created_by?: string;
    project_id?: string;
    due_date: string;
    created_at?: string;
    updated_at?: string;
}
