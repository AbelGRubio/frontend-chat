[**react v1.0.0**](../../../README.md)

***

[react](../../../modules.md) / [services/keycloakService](../README.md) / initKeycloak

# Function: initKeycloak()

> **initKeycloak**(): `Promise`\<`boolean`\>

Defined in: [services/keycloakService.ts:36](https://github.com/AbelGRubio/frontend-chat/blob/94a79fb2b79fd1c18d40ec9eeb8377e87e00aa93/src/services/keycloakService.ts#L36)

Initializes the Keycloak instance and performs login if necessary.

- Saves the token to session storage after login.
- Automatically attempts to refresh the token every 30 seconds if expired.

## Returns

`Promise`\<`boolean`\>

A promise that resolves to `true` if authenticated, otherwise `false`.
