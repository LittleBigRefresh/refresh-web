export interface AccountUpdateRequest {
    emailAddress: string | undefined;

    allowIpAuthentication: boolean | undefined;
    psnAuthenticationAllowed: boolean | undefined;
    rpcnAuthenticationAllowed: boolean | undefined;
}