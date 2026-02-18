/**
 * shared-auth-lib - Cross-company authentication library
 * @version 3.2.4
 */
const jwt = require('jsonwebtoken');

class TokenValidator {
  constructor(options = {}) {
    this.issuer = options.issuer || 'nexuscorp.io';
    this.algorithms = options.algorithms || ['EdDSA', 'RS256'];
    this.clockTolerance = options.clockTolerance || 30;
  }

  validate(token, publicKey) {
    return jwt.verify(token, publicKey, {
      issuer: this.issuer,
      algorithms: this.algorithms,
      clockTolerance: this.clockTolerance,
    });
  }
}

class RBACMiddleware {
  constructor(roleHierarchy) {
    this.hierarchy = roleHierarchy || { admin: ['write', 'read'], write: ['read'] };
  }

  requireRole(role) {
    return (req, res, next) => {
      const userRoles = req.auth?.roles || [];
      if (userRoles.some(r => r === role || (this.hierarchy[r] || []).includes(role))) {
        return next();
      }
      res.status(403).json({ error: 'Insufficient permissions' });
    };
  }
}

module.exports = { TokenValidator, RBACMiddleware };