-- CreateTable
CREATE TABLE "Drama" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "alternativeTitle" TEXT,
    "urlPhoto" TEXT,
    "year" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "synopsis" TEXT,
    "availability" TEXT NOT NULL,
    "trailerLink" TEXT,
    "award" TEXT,
    "rating" DOUBLE PRECISION,

    CONSTRAINT "Drama_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "photo" TEXT,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dramaId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DramaToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ActorToDrama" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DramaToGenre_AB_unique" ON "_DramaToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_DramaToGenre_B_index" ON "_DramaToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ActorToDrama_AB_unique" ON "_ActorToDrama"("A", "B");

-- CreateIndex
CREATE INDEX "_ActorToDrama_B_index" ON "_ActorToDrama"("B");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DramaToGenre" ADD CONSTRAINT "_DramaToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DramaToGenre" ADD CONSTRAINT "_DramaToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToDrama" ADD CONSTRAINT "_ActorToDrama_A_fkey" FOREIGN KEY ("A") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActorToDrama" ADD CONSTRAINT "_ActorToDrama_B_fkey" FOREIGN KEY ("B") REFERENCES "Drama"("id") ON DELETE CASCADE ON UPDATE CASCADE;
