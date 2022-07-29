CREATE TABLE "Products"(
    "product_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slogan" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "default_price" TEXT NOT NULL
);
CREATE INDEX "products_product_id_index" ON
    "Products"("product_id");
ALTER TABLE
    "Products" ADD PRIMARY KEY("product_id");
CREATE TABLE "Features"(
    "feature_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "feature" TEXT NOT NULL,
    "value" TEXT NULL
);
CREATE INDEX "features_product_id_index" ON
    "Features"("product_id");
ALTER TABLE
    "Features" ADD PRIMARY KEY("feature_id");
CREATE TABLE "Styles"(
    "style_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "sale_price" TEXT NULL,
    "original_price" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL
);
CREATE INDEX "styles_product_id_index" ON
    "Styles"("product_id");
ALTER TABLE
    "Styles" ADD PRIMARY KEY("style_id");
CREATE TABLE "SKUs"(
    "sku_id" INTEGER NOT NULL,
    "style_id" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL
);
CREATE INDEX "skus_style_id_index" ON
    "SKUs"("style_id");
ALTER TABLE
    "SKUs" ADD PRIMARY KEY("sku_id");
CREATE TABLE "Photos"(
    "photo_id" INTEGER NOT NULL,
    "style_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL
);
CREATE INDEX "photos_style_id_index" ON
    "Photos"("style_id");
ALTER TABLE
    "Photos" ADD PRIMARY KEY("photo_id");
CREATE TABLE "Related Products"(
    "relationship_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "related_id" INTEGER NOT NULL
);
CREATE INDEX "related products_product_id_index" ON
    "Related Products"("product_id");
ALTER TABLE
    "Related Products" ADD PRIMARY KEY("relationship_id");
ALTER TABLE
    "Features" ADD CONSTRAINT "features_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "Products"("product_id");
ALTER TABLE
    "Styles" ADD CONSTRAINT "styles_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "Products"("product_id");
ALTER TABLE
    "SKUs" ADD CONSTRAINT "skus_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "Styles"("style_id");
ALTER TABLE
    "Photos" ADD CONSTRAINT "photos_style_id_foreign" FOREIGN KEY("style_id") REFERENCES "Styles"("style_id");
ALTER TABLE
    "Related Products" ADD CONSTRAINT "related products_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "Products"("product_id");
ALTER TABLE
    "Related Products" ADD CONSTRAINT "related products_related_id_foreign" FOREIGN KEY("related_id") REFERENCES "Products"("product_id");