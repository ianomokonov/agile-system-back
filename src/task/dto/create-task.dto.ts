import { TaskPriority } from '../task-priority';
import { TaskType } from '../task-type';

export interface CreateTaskDto {
  name: string;
  description: string;
  projectUserId?: number;
  creatorId?: number;
  priorityId: TaskPriority;
  typeId: TaskType;
  projectSprintId?: number;
  files?: any[];
}
