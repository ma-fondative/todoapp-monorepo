export function getEnvVar(name: string) {
  if (!name.startsWith('VITE_')) {
    name = `VITE_${name}`;
  }

  if (!import.meta.env[name]) {
    throw new Error(`Missing env var "${name}".`);
  }

  return import.meta.env[name];
}
