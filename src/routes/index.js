import passport from "passport";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import { logger } from "../logs";
import {
  getAllProducts,
 } from "../controllers/producto";
import { WppService } from "../services/twilio";

const router = Router();
const passportOptions = {
  badRequestMessage: "Falta el email o la cantrasenia",
};

router.get("/", (req, res) => {
  res.json({ msg: "Inicie sesion" });
});

router.post(
  "/",
  passport.authenticate("login", passportOptions),
  (req, res, user) => {
    if (!user)
      return res.status(401).json({ msg: "Usuario o contrasenia incorrectos" });
    else res.redirect("/api/productos");
  }
);

router.get("/productos", isLoggedIn, getAllProducts);

router.get('/comprar', async (req, res) => {
  try {
    const response = await WppService.sendWhatsAppMessage(
      '+5493515098515',
      body.user,
    );

    res.json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  res.json({
    msg: "Complete con sus datos",
  });
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    logger.info("Informacion de registro");
    logger.info(err, user, info);

    if (err) {
      logger.error(err);
      return next(err);
    }

    if (!user) {
      logger.error("Error de registro");
      return res.status(401).json({
        msg: "Error de regristo",
      });
    } else res.json({ msg: "Registro completado" });
  })(req, res, next);
});

export default router;