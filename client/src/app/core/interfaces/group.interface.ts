import { Label } from '@core/interfaces/label.interface';
import { Message } from '@core/interfaces/message.interface';

export interface Group {
    id?: number;
    name: string;
    created_by?: number;
    created_at?: string;
    updated_at?: string;
}
