const { emit } = require("nodemon");
const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 chars" })
    .max(20, { message: "Name should me maximum of 20 chars" }),

  email: z
    .string({ required_error: "mail is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "mail must be atleast of 3 chars" })
    .max(20, { message: "mail should me maximum of 20 chars" }),

  phone: z
    .string({ required_error: "phone is required" })
    .trim()
    .min(10, { message: "phone must be atleast of 10 chars" })
    .max(20, { message: "phone should me maximum of 20 chars" }),

  password: z
    .string({ required_error: "password is required" })
    .min(7, { message: "password must be atleast of 7 chars" })
    .max(20, { message: "password should me maximum of 20 chars" }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "mail is required" })
    .trim()
    .email({ message: "invalid email address" })
    .min(3, { message: "mail must be atleast of 3 chars" })
    .max(20, { message: "mail should me maximum of 20 chars" }),
  password: z
    .string({ required_error: "password is required" })
    .min(7, { message: "password must be atleast of 7 chars" })
    .max(20, { message: "password should me maximum of 20 chars" }),
});

module.exports = { signupSchema, loginSchema };
