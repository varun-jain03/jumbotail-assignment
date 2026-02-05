const Fuse = require("fuse.js");
const normalizeQuery = require('../utils/queryNormalizer.js');

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "title", weight: 0.5 },
    { name: "metadata.model", weight: 0.1 },
    { name: "metadata.storage", weight: 0.1 },
    { name: "metadata.color", weight: 0.2 },
    { name: "description", weight: 0.1 }
  ]
};

function applyBusinessRanking(fuseResults, intent) {
  return fuseResults
    .map(({ item, score }) => {
      let finalScore = 0;

      // Fuse score is lower = better → invert it
      const textScore = 1 - score;
      finalScore += textScore * 0.35;

      finalScore += (item.rating / 5) * 0.2;
      finalScore += Math.log(item.unitsSold + 1) / 10 * 0.1;
      finalScore += item.stock > 0 ? 0.1 : 0;

      if (intent.isCheap) {
        finalScore += 1 / Math.log(item.price + 10) * 0.2;
      }

      if (intent.maxPrice && item.price <= intent.maxPrice) {
        finalScore += 0.15;
      }

      if (intent.wantsLatest) {
        const ageDays =
          (Date.now() - new Date(item.createdAt)) / (1000 * 60 * 60 * 24);
        finalScore += ageDays < 180 ? 0.1 : 0;
      }

      return {
        ...item,
        score: finalScore
      };
    })
    .sort((a, b) => b.score - a.score);
}

function searchProducts(products, query) {
  const fuse = new Fuse(products, fuseOptions);
  const intent = normalizeQuery(query);

  const fuseResults = fuse.search(query);
  return applyBusinessRanking(fuseResults, intent);
}

module.exports = searchProducts;