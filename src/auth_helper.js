import { UserManager } from 'oidc-client';

const settings = {
    authority: "http://keycloak:8080/auth/realms/Studropica",
    client_id: "frontend_client",
    redirect_uri: "http://localhost:3000/signin-callback.html",
    signinRedirect: "http://localhost:3000/signin-callback.html",
    response_type: 'code',
    scope: "openid profile product.read",
};

const userManager = new UserManager(settings);

export const getUser = () => {
    return userManager.getUser();
}

export const login = () => {
    return userManager.signinRedirect();
}

export const logout = () => {
    return userManager.signoutRedirect();
}