import { SetMetadata } from '@nestjs/common';
import { Permissions } from 'src/project/permissions';

export const AccessPermission = (permission: Permissions) =>
  SetMetadata('permission', permission);
