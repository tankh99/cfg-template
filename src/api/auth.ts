import { clientPost, getAccessToken } from "./base";

export async function getCurrentUser() {
    const accessToken = getAccessToken()
    return accessToken?.trim() !== ""
}

export async function login(payload: unknown) {
    const res = await clientPost(`login`, payload)
    return res;
}