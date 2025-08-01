[**react v1.0.0**](../../../README.md)

***

[react](../../../modules.md) / [hooks/useWebSocket](../README.md) / useWebSocket

# Function: useWebSocket()

> **useWebSocket**(`url`): `object`

Defined in: [hooks/useWebSocket.tsx:25](https://github.com/AbelGRubio/frontend-chat/blob/94a79fb2b79fd1c18d40ec9eeb8377e87e00aa93/src/hooks/useWebSocket.tsx#L25)

Hook that establishes and manages a WebSocket connection.

It handles:
- Connection state (`isConnected`)
- Incoming messages (`messages`)
- Sending messages with Keycloak token (`sendMessage`)

## Parameters

### url

`string`

The WebSocket URL to connect to.

## Returns

`object`

An object containing the message list, connection status, and a function to send messages.

### isConnected

> **isConnected**: `boolean`

### messages

> **messages**: `string`[]

### sendMessage()

> **sendMessage**: (`content`) => `void`

#### Parameters

##### content

`string`

#### Returns

`void`
