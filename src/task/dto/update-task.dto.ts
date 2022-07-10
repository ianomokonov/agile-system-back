export interface UpdateTaskDto {
  id: number;
  name: string;
  description: string;
  projectUserId?: number;
  userId?: number;
  projectId?: number;
  statusId: number;
  typeId: number;
  projectSprintId?: number | null;
  epicId?: number | null;
  priorityId: number;
  points: number;
}
