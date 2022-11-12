import build from './app';
import { connectToDatabase } from './services/database.service';
import { setupMessageConsumers } from './setupConsumers';

const start = async (): Promise<void> => {
    const app = build();
    try {
        await connectToDatabase();
        await setupMessageConsumers();
        await app.listen({ port: 3000 });
    } catch (err) {
        app.log.error(err);
    }
};
// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
