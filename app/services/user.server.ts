import prisma from "~/lib/prisma.server";

export async function getUserById({ id }: { id: string }) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      password: true,
    },
  });
  if (!user) {
    return null;
  }
  const { password, ...userData } = user;
  return { ...userData, hasPassword: !!password?.hash };
}
