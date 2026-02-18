# shared-auth-lib

Cross-company authentication library for microservice federation.

## Overview

`shared-auth-lib` provides JWT-based authentication, RBAC authorization, and token validation
for distributed agent systems. Used by 12+ production services across 3 organizations.

## Features

- **JWT Validation** - Ed25519 + RS256 signature verification
- **RBAC Middleware** - Role-based access control with scope inheritance
- **Token Rotation** - Automatic key rotation with zero-downtime
- **Audit Logging** - Every auth decision is traceable

## Installation

```bash
npm install @nexuscorp/shared-auth-lib
```

## Usage

```javascript
const { validateToken, requireRole } = require('@nexuscorp/shared-auth-lib');

app.use(validateToken({ issuer: 'nexuscorp.io' }));
app.get('/admin', requireRole('admin'), handler);
```

## Security

Report vulnerabilities to security@nexuscorp.io

## License

Apache 2.0