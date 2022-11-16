import build from './app';
import { connectAndInitDatabase } from './services/database.service';
import { setupMessageConsumers } from './setupConsumers';

const start = async (): Promise<void> => {
    const app = build();
    try {
        await connectAndInitDatabase();
        await setupMessageConsumers();
        await app.listen({ port: 3000 });
    } catch (err) {
        console.error(err);
    }
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
