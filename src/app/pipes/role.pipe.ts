import { Pipe, PipeTransform } from '@angular/core';
import { UserRoles } from '../api/types/users/user-roles';

@Pipe({
  name: 'role',
  standalone: true
})
// Didn't really care enough to find out how to iterate the enum and get the value names automatically
export class RolePipe implements PipeTransform {
  transform(value: UserRoles): string {
    switch (value) {
      case UserRoles.Admin:
        return "Admin";
      case UserRoles.Moderator:
        return "Moderator";
      case UserRoles.Curator:
        return "Curator";
      case UserRoles.Trusted:
        return "Trusted";
      case UserRoles.User:
        return "User";
      case UserRoles.Restricted:
        return "Restricted";
      case UserRoles.Banned:
        return "Banned";
      default:
        return "Unknown";
    }
  }
}
