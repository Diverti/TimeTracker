import { Label } from '@core/interfaces/label.interface';
import { Message } from '@core/interfaces/message.interface';

export interface Project {
    id?: number;
    name: string;
    due_date: string;
    labels?: Label[];
    status?: 'NEW' | 'DOING' | 'DONE';
    user?: number;
    createdAt?: string;
    modifiedAt?: string;
    messages?: Message[];
}
