import prisma from "../prisma";

export const ConnectToDb = () => {
  prisma
    .$connect()
    .then(() => console.log("[database]: Database connected successfully."))
    .catch((error: any) =>
      console.error("Failed to connect to the database:", error)
    );
};
