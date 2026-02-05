// const hinglish = {
//   sasta: "cheap",
//   mehenga: "expensive",
//   bada: "large",
//   chota: "small",
//   accha: "good"
// };

// function normalizeQuery(query){
//   let words = query.toLowerCase().split(" ");

//   words = words.map(word => hinglish[word] || word);

//   return words.join(" ");
// }

// module.exports = normalizeQuery;

// src/utils/queryParser.js

function normalizeQuery(query) {
  const q = query.toLowerCase();

  const priceMatch =
    q.match(/(\d+)\s?k/) || q.match(/(\d+)\s*rupees?/);

  return {
    isCheap: q.includes("sasta") || q.includes("cheap") || q.includes("low price"),
    wantsLatest: q.includes("latest") || q.includes("new"),
    maxPrice: priceMatch
      ? Number(priceMatch[1]) * (q.includes("k") ? 1000 : 1)
      : null
  };
}

module.exports = normalizeQuery;
