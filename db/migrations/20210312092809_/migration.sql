/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId,id]` on the table `Walk`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Walk.userId_id_unique" ON "Walk"("userId", "id");
