import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { generateRandomPassword } from 'src/utils/helpers/random-password.helper';
import { LocalCache } from 'src/utils/services/local-cache.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'store-mag-types';

@Injectable()
export class EmployeeService {
  private clientId: string;
  private clientSecret: string;
  private audience: string;
  private domain: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly localCache: LocalCache<string>,
  ) {
    this.clientId = configService.get('AUTH0_CLIENT_ID');
    this.clientSecret = configService.get('AUTH0_CLIENT_SECRET');
    this.audience = configService.get('AUTH0_AUDIENCE');
    this.domain = configService.get('AUTH0_DOMAIN');
  }

  async getAccessToken(): Promise<string> {
    const cachedToken = this.localCache.get('auth0-access-token');

    if (cachedToken) {
      return cachedToken;
    }

    const response = await fetch(`https://${this.domain}/oauth/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: this.clientId,
        client_secret: this.clientSecret,
        audience: this.audience,
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();

    this.localCache.set('auth0-access-token', data.access_token, 60);

    return data.access_token;
  }

  async createUser({ storeId, ...data }: CreateEmployeeDto): Promise<void> {
    const accessToken = await this.getAccessToken();

    const password = generateRandomPassword();
    const user_metadata = { storeId };

    const payload = {
      ...data,
      password,
      user_metadata,
      connection: 'Username-Password-Authentication',
    };

    const response = await fetch(`https://${this.domain}/api/v2/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.statusCode) {
      throw new Error(result.message);
    }

    return result;
  }

  async getUsers() {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`https://${this.domain}/api/v2/users`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async getUser(id: string) {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`https://${this.domain}/api/v2/users/${id}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    return data;
  }

  async deleteUser(id: string) {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`https://${this.domain}/api/v2/users/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      redirect: 'follow',
    });

    if (response.status !== 204) {
      throw new Error('Failed to delete user');
    }

    return true;
  }

  async updateUser({ storeId, id, ...data }: UpdateEmployeeDto) {
    const accessToken = await this.getAccessToken();

    const payload = { ...data, user_metadata: undefined };

    if (storeId) {
      payload.user_metadata = { storeId };
    }

    const response = await fetch(`https://${this.domain}/api/v2/users/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.statusCode) {
      throw new Error(result.message);
    }

    return result;
  }
}
