import { UserShortView } from '../../auth/dto/user-short-view';

export interface ProjectEditInfo {
  name: string;
  repository: string;
  description: string;
  users: UserShortView[];
}
