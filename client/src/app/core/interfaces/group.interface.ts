import { Message } from '@core/interfaces/message.interface';
import { Project } from './project.interface';
import { User } from './user.interface';

export interface Group {
    id?: number;
    name: string;
    projects: Project[];
    users: User[];
    created_by?: number;
    created_at?: string;
    updated_at?: string;
}
