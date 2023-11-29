export class CreatePermissionDto {
  path: string;
  method: string;
  allowedRoles: string[];
}
