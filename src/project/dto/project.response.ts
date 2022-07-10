import { Sprint } from 'src/sprint/dto/sprint';
import { StatusResponse } from 'src/task/dto/status.response';
import { UserShortView } from '../../auth/dto/user-short-view';

export interface ProjectResponse {
  id: number;
  name: string;
  repository: string;
  description: string;
  isClosed: boolean;
  sprint: Sprint;
  activePlanningId: number;
  retro?: { id: number; isFinished };
  demo?: { id: number; isFinished };
  statuses: StatusResponse[];
  users: UserShortView[];
}
