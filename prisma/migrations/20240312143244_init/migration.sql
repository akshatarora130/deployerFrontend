-- CreateTable
CREATE TABLE "userInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "projects" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "userInfo_pkey" PRIMARY KEY ("id")
);
