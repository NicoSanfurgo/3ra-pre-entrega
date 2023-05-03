import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user";
import { logger } from "../logs";
import { CartModel } from "../models/carritos";

const StrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const login = async (req, email, password, done) => {
  logger.info("Login!!!");

  const user = await UserModel.findOne({ email });

  if (!user || !user.isValidPassword(password)) {
    logger.warn("Email o contrasenia incorrectos");
    return done(null, false, { message: "Email o contrasenia incorrectos" });
  } else {
    logger.info("Todo ok");
    return done(null, user);
  }
};

const signup = async (req, email, password, done) => {
  try {
    logger.info("Registro!!!");

    const { nombre, apellido, edad, telefono, direccion, email, password } =
      req.body;
    logger.info(req.body);

    if (!email) {
      logger.error("Campos invalidos");
      return done(null, false, { msg: "Campos invalidos" });
    }

    const query = {
      $or: [{ email: email }],
    };

    const user = await UserModel.findOne(query);

    if (user) {
      logger.error("El usuario ya existe");
      logger.warn(user);
      return done(null, false, { msg: "El usuario ya existe" });
    } else {
      const cart = await CartModel.create({});
      const userData = {
        nombre,
        apellido,
        edad,
        telefono,
        direccion,
        email,
        password,
        cart,
      };

      const newUser = await UserModel.create(userData);
      return done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
};

export const loginFunc = new LocalStrategy(StrategyOptions, login);
export const signupFunc = new LocalStrategy(StrategyOptions, signup);

passport.serializeUser((user, done) => {
  logger.info("Se ejecuta el serializeUser");
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  logger.info("Se ejecuta el deserializeUser");
  UserModel.findById(userId).then((user) => {
    return done(null, user);
  });
});
