export function validatePasswordStrength(password) {
  if (!password || typeof password !== 'string') {
    return {
      valid: false,
      errors: ['Password is required'],
      strength: 0,
    };
  }

  const errors = [];
  let strength = 0;

  if (password.length >= 12) strength++;
  else errors.push('At least 12 characters');

  if (/[A-Z]/.test(password)) strength++;
  else errors.push('Uppercase letter');

  if (/[a-z]/.test(password)) strength++;
  else errors.push('Lowercase letter');

  if (/[0-9]/.test(password)) strength++;
  else errors.push('Number');

  if (/[^A-Za-z0-9]/.test(password)) strength++;
  else errors.push('Special character');

  return {
    valid: errors.length === 0,
    errors,
    strength, // 0 → 5
  };
}
