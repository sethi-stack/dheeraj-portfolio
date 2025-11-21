# Design a Search Engine (Google)

## 1. Requirements

### Functional
- **Crawl**: Gather data (see Web Crawler).
- **Index**: Organize data for fast retrieval.
- **Search**: User queries return relevant results.

### Non-Functional
- **Fast**: Results in < 200ms.
- **Relevant**: High precision and recall.
- **Fresh**: Index updates quickly.

---

## 2. Architecture

### A. Gatherer (Crawler)
- Collects documents.

### B. Indexer
- **Document Processor**: Cleans text, tokenizes, removes stop words, stemming.
- **Forward Index**: `DocID -> [Keywords]`.
- **Inverted Index**: `Keyword -> [DocID, Frequency, Position]`.
    - *Crucial for search.*

### C. Query Processor
- **Parsing**: Spell check, query expansion.
- **Retrieval**: Look up keywords in Inverted Index.
- **Ranking**: Sort results based on relevance (PageRank, TF-IDF, BM25).

---

## 3. Deep Dive

### Inverted Index Construction
- **MapReduce**:
    - **Map**: Emit `<Term, DocID>`.
    - **Reduce**: Aggregate into `<Term, List<DocID>>`.
- **Sharding**:
    - **Document Partitioning**: Each shard holds a subset of documents. Query all shards and merge. (Easier to manage).
    - **Term Partitioning**: Each shard holds a subset of terms. (Harder to balance load).

### Ranking
- **TF-IDF**: Term Frequency - Inverse Document Frequency.
    - High if term appears often in this doc but rarely elsewhere.
- **PageRank**: Link analysis. A page is important if other important pages link to it.
- **Quality Score**: User clicks, dwell time, domain authority.

### Typeahead / Autocomplete
- Separate service using Tries (Prefix Trees).
- Caches top N queries for each prefix.
