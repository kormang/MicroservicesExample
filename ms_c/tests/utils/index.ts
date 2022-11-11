export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export async function waitFor(condition: () => Promise<boolean>) {
    while (!(await condition())) {
        sleep(10);
    }
}
