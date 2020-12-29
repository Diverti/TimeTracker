import { Label } from '@core/interfaces/label.interface';
import { Message } from '@core/interfaces/message.interface';

export interface Project {
    id?: number;
    name: string;
    due_date: string;
    group_id?: number;
    is_done?: number;
    company_id?: number;
    created_at?: string;
    updated_at?: string;
}
