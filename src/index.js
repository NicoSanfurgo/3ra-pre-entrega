import { connectDb } from "./services/db";
import Config from "./config";
import minimist from "minimist";
import cluster from "cluster";
import os from "os";
import { logger } from "./logs";
import Server from "./services/server";

const argumentos = minimist(process.argv.slice(2));
const clusterMode = argumentos.cluster;
const numCPUs = os.cpus().length;

const init = () => {
  connectDb();

  if (clusterMode && cluster.isPrimary) {
    logger.info("Escuchando modo cluster");
    logger.info(`PID Master ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
      cluster.fork();
    });
  } else {
    Server.listen(Config.PORT, () => {
      logger.info(
        `Servidor en el puerto ${Config.PORT} - PID Worker ${process.pid}`
      );
    });
  }
};

init();
