# 🛒 E-commerce Product Search Engine (Backend Service)

This repository contains a backend microservice for an **e-commerce product search engine** targeting Tier-2 and Tier-3 cities in India.  
The service is designed to efficiently store a large electronics catalog and return **highly relevant, ranked search results** with low latency.

The system focuses on handling real-world search behavior such as:

✅ Spelling mistakes  
✅ Hinglish queries  
✅ Price-based intent  
✅ Attribute filtering  
✅ Ranking based on business signals  

---

# 🚀 Features

- In-memory product catalog for ultra-fast retrieval (<1000ms latency)
- Fuzzy search with typo tolerance using **Fuse.js**
- Hinglish-aware query normalization (e.g., *sasta → cheap*)
- Intelligent ranking algorithm
- Metadata enrichment support
- Clean modular architecture
- Exception handling
- Easily extensible to Elasticsearch or persistent databases

---

# 🧱 Tech Stack

- **Node.js**
- **Express.js**
- **Fuse.js** — lightweight fuzzy search library
- JavaScript in-memory datastore

---

# 📁 Project Structure

src/
├── app.js
├── routes/
│ ├── product.routes.js
│ └── search.routes.js
├── services/
│ └── search.service.js
└── utils/
  └── queryNormalizer.js

