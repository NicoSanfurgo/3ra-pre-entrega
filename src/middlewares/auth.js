import { logger } from "../logs/index";

export const isLoggedIn = (req, res, done) => {
  logger.info("Autenticado");
  logger.info(req.isAuthenticated());

  if (!req.isAuthenticated()) {
    logger.error("Sin autorizacion");
    return res.status(401).json({ msg: "Sin autorizacion" });
  } else done();
};
