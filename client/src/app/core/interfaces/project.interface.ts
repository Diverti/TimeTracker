import { ComponentFactory } from '@angular/core';
import { Message } from '@core/interfaces/message.interface';
import { Company } from './company.interface';
import { Task } from './task.interface';


export interface Project {
    id?: number;
    name: string;
    description: string,
    due_date: string;
    group_id?: number;
    is_done?: number;
    tasks?: Task[];
    company: Company;
    company_id?: number;
    created_at?: string;
    updated_at?: string;
}
