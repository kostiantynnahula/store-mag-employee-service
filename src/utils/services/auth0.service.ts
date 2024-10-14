import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LocalCache } from 'src/utils/services/local-cache.service';
import axios from 'axios';

@Injectable()
export class Auth0Service {
  /**
   * Auth0 client ID
   */
  protected readonly clientId: string;

  /**
   * Auth0 client secret
   */
  protected readonly clientSecret: string;

  /**
   * Auth0 audience
   */
  protected readonly audience: string;

  /**
   * Auth0 domain
   */
  protected readonly domain: string;

  /**
   * Auth0 request path
   */
  protected readonly requestPath: string;

  constructor(
    protected readonly configService: ConfigService,
    protected readonly localCache: LocalCache<string>,
  ) {
    this.clientId = configService.get('AUTH0_CLIENT_ID');
    this.clientSecret = configService.get('AUTH0_CLIENT_SECRET');
    this.audience = configService.get('AUTH0_AUDIENCE');
    this.domain = configService.get('AUTH0_DOMAIN');
    this.requestPath = `https://${this.domain}`;
  }

  /**
   * Get access to the Auth0 API
   *
   * @returns {Promise<string>}
   */
  async getAccessToken(): Promise<string> {
    const cachedToken = this.localCache.get('auth0-access-token');

    if (cachedToken) {
      return cachedToken;
    }

    const response = await axios.post(`${this.requestPath}/oauth/token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      audience: this.audience,
      grant_type: 'client_credentials',
    });

    const { access_token } = response.data;

    this.localCache.set('auth0-access-token', access_token, 60);

    return access_token;
  }

  /**
   * Get default headers for Auth0 API
   *
   * @returns {Promise<Record<string, string>}
   */
  async getHeaders(): Promise<Record<string, string>> {
    const accessToken = await this.getAccessToken();

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
}
