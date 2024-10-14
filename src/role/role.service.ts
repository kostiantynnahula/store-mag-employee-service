import { Injectable } from '@nestjs/common';
import { Auth0Service } from 'src/utils/services/auth0.service';
import axios from 'axios';
import { Auth0Role, Role } from 'store-mag-types';

@Injectable()
export class RoleService extends Auth0Service {
  async getRoles(): Promise<Auth0Role[]> {
    const response = await axios.get(`${this.requestPath}/api/v2/roles`, {
      headers: await this.getHeaders(),
    });

    return response.data;
  }

  async getRoleByName(name: Role): Promise<Auth0Role> {
    const roles = await this.getRoles();

    return roles.find((role) => role.name === name);
  }

  async assignEmployeeRole(userId: string) {
    const role = await this.getRoleByName(Role.EMPLOYEE);

    const result = await axios.post(
      `${this.requestPath}/api/v2/users/${userId}/roles`,
      { roles: [role.id] },
      { headers: await this.getHeaders() },
    );

    return result.data;
  }
}
