export interface Task {
    id: number;
    userId: string;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'done';
}
