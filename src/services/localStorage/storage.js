/********** LOCAL STORAGE [REFRESH_TOKEN] **********/
export async function saveRefreshToken(refreshToken) {
    localStorage.setItem('REFRESH_TOKEN_AUTH', JSON.stringify(refreshToken));
}

export async function getRefreshTokenAuth() {
    const refreshtoken = localStorage.getItem('REFRESH_TOKEN_AUTH');
    return refreshtoken !== null ? JSON.parse(refreshtoken) : null;
}

export async function deleteRefreshToken() {
    localStorage.removeItem('REFRESH_TOKEN_AUTH');
}

/********** LOCAL STORAGE [TOKEN] **********/
export async function saveTokenAuth(refreshToken) {
    localStorage.setItem('TOKEN_AUTH', JSON.stringify(refreshToken));
}

export async function getTokenAuth() {
    const tokenAuth = localStorage.getItem('TOKEN_AUTH');
    return tokenAuth !== null ? JSON.parse(tokenAuth) : null;
}

export async function deleteTokenAuth() {
    localStorage.removeItem('TOKEN_AUTH');
}