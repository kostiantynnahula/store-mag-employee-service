import { Injectable } from '@nestjs/common';
import { generateRandomPassword } from 'src/utils/helpers/random-password.helper';
import { Auth0Service } from 'src/utils/services/auth0.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  Auth0User,
  ListQuery,
} from 'store-mag-types';
import axios from 'axios';

@Injectable()
export class EmployeeService extends Auth0Service {
  /**
   * Create employee as a user in Auth0
   * @param {CreateEmployeeDto} { storeId, ...data }
   * @returns {Promise<Auth0User>}
   */
  async create({ storeId, ...data }: CreateEmployeeDto): Promise<Auth0User> {
    const password = generateRandomPassword();
    const user_metadata = { storeId };

    const payload = {
      ...data,
      password,
      user_metadata,
      connection: 'Username-Password-Authentication',
    };

    const response = await axios.post(
      `${this.requestPath}/api/v2/users`,
      payload,
      { headers: await this.getHeaders() },
    );

    if (response.data.statusCode) {
      throw new Error(response.data.message);
    }

    return response.data;
  }

  /**
   * List employees
   * @param {ListQuery} query
   * @returns {Promise<Auth0User[]>}
   */
  async list(query: ListQuery): Promise<Auth0User[]> {
    const response = await axios.get(`${this.requestPath}/api/v2/users`, {
      headers: await this.getHeaders(),
    });

    return response.data;
  }

  /**
   * Get employee by id
   * @param {string} id
   * @returns {Promise<Auth0User>}
   */
  async get(id: string): Promise<Auth0User> {
    const response = await axios.get(`${this.requestPath}/api/v2/users/${id}`, {
      headers: await this.getHeaders(),
    });

    if (response.status !== 200) {
      throw new Error('Failed to get user');
    }

    return response.data;
  }

  /**
   * Delete employee by id
   * @param {string} id
   * @returns {Promise<boolean>}
   */
  async delete(id: string): Promise<boolean> {
    const response = await axios.delete(
      `${this.requestPath}/api/v2/users/${id}`,
      { headers: await this.getHeaders() },
    );

    if (response.status !== 204) {
      throw new Error('Failed to delete user');
    }

    return true;
  }

  /**
   * Update employee by id
   * @param {UpdateEmployeeDto} { storeId, id, ...data }
   * @returns {Promise<Auth0User>}
   */
  async update({
    storeId,
    id,
    ...data
  }: UpdateEmployeeDto): Promise<Auth0User> {
    const payload = { ...data, user_metadata: undefined };

    if (storeId) {
      payload.user_metadata = { storeId };
    }

    const response = await axios.patch(
      `${this.requestPath}/api/v2/users/${id}`,
      payload,
      { headers: await this.getHeaders() },
    );

    if (response.data.statusCode) {
      throw new Error(response.data.message);
    }

    return response.data;
  }
}
