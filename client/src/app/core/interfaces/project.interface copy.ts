import { Message } from '@core/interfaces/message.interface';

export interface Project {
    id?: number;
    name: string;
    due_date: string;
    group_id: number;
    createdAt?: string;
    modifiedAt?: string;
    messages?: Message[];
}
