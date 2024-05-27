import { NextFunction, Request, Response } from "express";
import { auth } from "firebase-admin";

export const authorizeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        status: "error",
        message: "No Authorization token provided",
      });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({
        status: "error",
        message: "Invalid Authorization header format",
      });
    }

    const decodedToken = await auth().verifyIdToken(token);
    console.log(decodedToken);
    return next();
  } catch (err:any) {
    // Handling specific error messages
    if (err.code === "auth/id-token-expired") {
      return res.status(401).send({
        status: "error",
        message: "Token Expired",
      });
    }
    switch (err.code) {
      case "auth/id-token-expired":
        return res.status(401).send({
          status: "error",
          message: "Token Expired",
        });
      case "auth/argument-error":
        return res.status(401).send({
          status: "error",
          message: "Invalid Token",
        });
      default:
        console.error(err.message);
        return res.status(500).send({
          status: "error",
          message: "Internal Server Error",
        });
    }
  }
};
