export function getConfig(varName: string): string {
    const value = process.env[varName];
    if (typeof value === 'undefined') {
        throw new Error(`Unknown configuration variable '${varName}'.`);
    }
    return value;
}
