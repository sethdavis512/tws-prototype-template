-- CreateTable
CREATE TABLE "SmolLink" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "vanity" TEXT NOT NULL,
    "vanityUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SmolLink_vanity_key" ON "SmolLink"("vanity");
