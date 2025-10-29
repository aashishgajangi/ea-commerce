-- AlterTable: Add SEO and Blocks fields to pages table
-- All fields are nullable (no data loss)

ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "focusKeyphrase" TEXT;
ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "focusKeyphrases" TEXT;
ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "robots" TEXT DEFAULT 'index,follow';
ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "schemaType" TEXT;
ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "schemaData" TEXT;
ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "blocks" TEXT;
