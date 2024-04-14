import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { GoogleStrategy } from "remix-auth-google";
import invariant from "tiny-invariant";
import bcrypt from "bcryptjs";

import { sessionStorage } from "./session.server";
import prisma from "~/lib/prisma.server";

type SessionUser = {
  id: string;
};

export const authenticator = new Authenticator<SessionUser>(sessionStorage);

// ======== STRATEGIES =========
const formStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email");
  const password = form.get("password");

  invariant(typeof email === "string", "email must be a string");
  invariant(email.length > 0, "email must not be empty");

  invariant(typeof password === "string", "password must be a string");
  invariant(password.length > 0, "password must be not be empty");

  const user = await loginWithEmailAndPassword(email.toLowerCase(), password);

  return user;
});

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  },
  async ({ profile }) => {
    const email = profile.emails[0].value;
    const providerId = profile.id;

    const foundUser = await prisma.user.findUnique({ where: { email } });

    if (!foundUser) {
      invariant(false, "User not registered");
    }

    invariant(
      foundUser.isActive,
      "Your account is inactive. Please contact admin!"
    );

    if (foundUser.googleProviderId) {
      invariant(foundUser.googleProviderId === providerId, "Account not found");
    }

    const user = await prisma.user.update({
      where: { email },
      data: { googleProviderId: providerId },
    });

    return user;
  }
);

authenticator.use(formStrategy);
authenticator.use(googleStrategy);

// ===== FUNCTIONS =======
async function loginWithEmailAndPassword(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  });

  invariant(!!user, "User not found");

  invariant(
    !!user.password,
    "Invalid credentials. Your password is incorrect or your password has not been set"
  );

  const isValidPassword = await verifyPassword(password, user.password.hash);

  invariant(
    isValidPassword,
    "Invalid credentials. Your password is incorrect or your password has not been set"
  );

  invariant(user.isActive, "Your account is inactive. Please contact admin!");

  return user;
}

export async function signupWithEmailAndPassword({
  email,
  name,
  password,
}: {
  email: string;
  password: string;
  name: string;
}) {
  const foundUser = await prisma.user.findUnique({
    where: { email },
    include: { password: true },
  });

  invariant(!foundUser, "Email already exists");

  const hash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, name, password: { create: { hash } } },
  });

  return user;
}

export async function setPassword(userId: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { password: true },
  });

  if (user?.password) {
    invariant(
      false,
      "Your password already set. If you want to change password, use change password"
    );
  }

  const hash = await hashPassword(password);

  await prisma.password.create({ data: { userId, hash } });
}

export async function changePassword(id: string, newHashedPassword: string) {
  return await prisma.user.update({
    where: { id },
    data: { password: { update: { hash: newHashedPassword } } },
  });
}

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
