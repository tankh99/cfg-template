import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { isPast, secondsToMilliseconds } from "date-fns";
import {jwtDecode} from 'jwt-decode'

export const ACCESS_TOKEN_KEY = "accessToken";

/**
 * @returns Access token from local storage, or ane empty string if it doesn't exist
 */
export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || "";

  // Only check for expiry if access token actually exists
  if (accessToken) {
    const decoded = jwtDecode(accessToken);

    // exp is stored in seconds, so we need to convert it to milliseconds
    if (isPast(secondsToMilliseconds(decoded.exp!))) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);

      return null;
    }
  }

  return accessToken;
}

export const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export async function getAxiosConfig(): Promise<AxiosRequestConfig> {
  const accessToken = getAccessToken();

  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: false,
    withXSRFToken: true,
  };
}

export async function clientGet(
  url: string,
  params?: Record<string, any>,
): Promise<any> {
  const config = await getAxiosConfig();

  return client.get(url, {
    params,
    ...config,
  });
}
export async function clientPost(
  url: string,
  data: any = {},
  multipart: boolean = false,
): Promise<any> {
  const config = await getAxiosConfig();

  if (multipart) {
    config.headers = {
      "Content-Type": "multipart/form-data",
    };
  }

  return client.post(url, data, { ...config });
}

export async function clientPut(url: string, data: any = {}): Promise<any> {
  const config = await getAxiosConfig();

  return client.put(url, data, { ...config });
}

export async function clientPatch(url: string, data: any = {}): Promise<any> {
  const config = await getAxiosConfig();

  return client.patch(url, data, { ...config });
}

export async function clientDelete(url: string, data: any = {}): Promise<any> {
  const config = await getAxiosConfig();
  const deleteConfig = {
    ...config,
    data,
  };

  return client.delete(url, { ...deleteConfig });
}
