# semantic-search
Website AI-powered search engine for websites, easily integrated into websites

Developed a search engine for website articles using machine learning models from HuggingFace, each article title, keywords, and summary is converted to vector embeddings which are stored on AWS DynamoDB (not up to DynamoDB attribute limit), when users make searches, the search word is converted to vector embeddings and compared using vector similarities, using a threshold, the top similar article embeddings are retrieved and shown to the user. This software was integrated into the website https://superearner.online and can easily be integrated into any other website.

Uses HuggingFace pretrained public model sentence-transformers/all-MiniLM-L6-v2
