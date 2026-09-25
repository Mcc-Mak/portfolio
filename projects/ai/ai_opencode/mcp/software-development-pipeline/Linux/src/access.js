'use strict';

const VALID_ROLES = new Set(['admin', 'developer', 'viewer']);

function validateRoles(roles) {
  if (!Array.isArray(roles)) {
    throw new TypeError('roles must be an array');
  }
  for (const role of roles) {
    if (typeof role !== 'string' || !VALID_ROLES.has(role)) {
      throw new RangeError('roles contains an unknown role');
    }
  }
  return roles;
}

function hasRole(roles, required) {
  validateRoles(roles);
  if (typeof required !== 'string' || !VALID_ROLES.has(required)) {
    throw new RangeError('required role is not recognized');
  }
  return roles.includes(required);
}

function assertRole(roles, required) {
  if (!hasRole(roles, required)) {
    throw new Error('access denied: role "' + required + '" is required');
  }
  return true;
}

function isOwner(userId, ownerId) {
  if (typeof userId !== 'string' || userId.length === 0) {
    throw new TypeError('userId must be a non-empty string');
  }
  if (typeof ownerId !== 'string' || ownerId.length === 0) {
    throw new TypeError('ownerId must be a non-empty string');
  }
  return userId === ownerId;
}

module.exports = { VALID_ROLES, validateRoles, hasRole, assertRole, isOwner };
