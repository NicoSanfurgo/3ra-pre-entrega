import express from "express";
import session from "express-session";
import passport from "passport";
import { loginFunc, signupFunc } from "./auth";
import mainRouter from "../routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use("login", loginFunc);
passport.use("signup", signupFunc);

app.use("/api", mainRouter);

export default app;
