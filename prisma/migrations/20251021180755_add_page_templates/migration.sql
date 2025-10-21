-- DropIndex
DROP INDEX "idx_cart_item_cart_product";

-- DropIndex
DROP INDEX "idx_cart_session_expires";

-- DropIndex
DROP INDEX "idx_category_active_order";

-- DropIndex
DROP INDEX "idx_configuration_key";

-- DropIndex
DROP INDEX "idx_media_user_created";

-- DropIndex
DROP INDEX "idx_menu_item_menu_parent";

-- DropIndex
DROP INDEX "idx_page_status_published";

-- DropIndex
DROP INDEX "idx_product_image_primary";

-- DropIndex
DROP INDEX "idx_product_category_status";

-- DropIndex
DROP INDEX "idx_product_featured_status";

-- DropIndex
DROP INDEX "idx_product_status_active";

-- DropIndex
DROP INDEX "idx_review_product_status";

-- DropIndex
DROP INDEX "idx_site_settings_key";

-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "homepageData" TEXT,
ADD COLUMN     "isEssential" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pageType" TEXT,
ADD COLUMN     "template" TEXT;

-- CreateIndex
CREATE INDEX "pages_pageType_idx" ON "pages"("pageType");
