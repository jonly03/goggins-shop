const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

/*
1. Go to https://shop.davidgoggins.com/collections/apparel to get links for all the tshirt pages links

2. Visit each tshirt page and get product info data
*/

const GOGGINS_BASE_URL = "https://shop.davidgoggins.com";
const TSHIRT_COLLECTION_PAGE = `${GOGGINS_BASE_URL}/collections/apparel`;

const PRODUCT_LINK_SELECTOR = ".collectionBlock__title > h4 > a";
const PRODUCT_INFO_SELECTOR = "#ProductJson--product-template";

async function getPageContent({ page, selector }) {
  const browser = await puppeteer.launch();
  const newPage = await browser.newPage();
  await newPage.goto(page);
  await newPage.waitForSelector(selector);
  return newPage.content();
}

async function getProductsLinks({ page, selector }) {
  return new Promise((resolve, reject) => {
    getPageContent({ page, selector })
      .then((linksPage) => {
        const $ = cheerio.load(linksPage);

        const linksURLs = [];
        const productsLinks = $(selector);

        for (let i = 0; i < productsLinks.length; i++) {
          linksURLs.push(
            `${GOGGINS_BASE_URL}${$(productsLinks[i]).attr("href")}`
          );
        }

        resolve(linksURLs);
      })
      .catch((err) => {
        console.log(err);
        resolve([]);
      });
  });
}

function getProductInfo({ page, selector }) {
  const __$ = cheerio.load(page);

  const product = JSON.parse(__$(selector).html());

  return {
    name: product.title,
    price: `$${(product.price / 100).toFixed(2)}`,
    image: `https:${product.featured_image}`,
    variants: product.variants.map((variant) => ({
      size: variant.option1,
      available: variant.available,
    })),
  };
}

async function getTshirtsProductInfo() {
  const tshirtsLinksUrls = await getProductsLinks({
    page: TSHIRT_COLLECTION_PAGE,
    selector: PRODUCT_LINK_SELECTOR,
  });

  const getTshirtsData = tshirtsLinksUrls.map((url) =>
    getPageContent({ page: url, selector: PRODUCT_INFO_SELECTOR })
  );

  const tshirtPages = await Promise.all(getTshirtsData);

  return tshirtPages.map((page) =>
    getProductInfo({ page, selector: PRODUCT_INFO_SELECTOR })
  );
}

module.exports = getTshirtsProductInfo;
