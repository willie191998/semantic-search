Semantic Search Engine for Websites
Overview
This project is an AI-powered semantic search engine designed for website integration. It leverages advanced machine learning models from HuggingFace to provide highly relevant search results based on semantic similarity rather than just keyword matching. The engine is designed to handle website articles, offering users a more intelligent and context-aware search experience.

Key Features
AI-Powered Search:

Utilizes HuggingFace's sentence-transformers/all-MiniLM-L6-v2 model for generating vector embeddings of article content.
Semantic Search:

Goes beyond traditional keyword-based search by understanding the context and meaning of search queries and article content.
Efficient Storage:

Vector embeddings are stored in AWS DynamoDB, ensuring quick retrieval and scalability.
Highly Accurate:

The HuggingFace model was selected based on its balance of size and accuracy, making it both lightweight and effective.
Website Integration:

Easily integrates into any website, with a working example at Superearner.
How It Works
Vector Embeddings:

Each article's title, keywords, and summary are converted into vector embeddings using the pretrained sentence-transformers/all-MiniLM-L6-v2 model from HuggingFace.
Storage:

These embeddings are stored in AWS DynamoDB, taking advantage of its fast read/write capabilities. The embeddings are designed to fit within DynamoDB's attribute limits.
Search Process:

When a user performs a search, the search query is similarly converted into a vector embedding.
This embedding is then compared against stored article embeddings using vector similarity metrics.
Articles with embeddings that exceed a similarity threshold are retrieved and presented to the user as the most relevant search results.
Integration:

The search engine has been successfully integrated into Superearner and is designed to be easily adaptable for other websites.
HuggingFace Model
The project utilizes the sentence-transformers/all-MiniLM-L6-v2 model from HuggingFace, a pretrained transformer model known for its compact size and high accuracy. This model was chosen specifically for its ability to deliver powerful semantic search capabilities without the overhead of larger models.

Model: sentence-transformers/all-MiniLM-L6-v2
Advantages:
Compact size for efficient storage and computation.
High accuracy in generating meaningful vector embeddings for semantic comparison.
Project History
Development Start: 2021
Current Status: Actively maintained with ongoing improvements.
Getting Started
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/semantic-search-engine.git
cd semantic-search-engine
Install Dependencies:

bash
Copy code
pip install -r requirements.txt
Configure AWS:

Ensure your AWS credentials are set up for accessing DynamoDB.
Run the Search Engine:

Populate the database with vector embeddings of your website's articles.
Start the search engine service to begin handling search queries.
Integration Guide
Prepare Your Data:

Convert your website's article titles, keywords, and summaries into vector embeddings using the provided scripts.
Store in DynamoDB:

Use the included DynamoDB integration to store these embeddings efficiently.
Deploy the Search Engine:

Integrate the search engine into your website's frontend, using the provided API endpoints to handle search queries.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contribution
Contributions are welcome! Please feel free to submit issues or pull requests.

Acknowledgments
HuggingFace: For providing the pretrained model sentence-transformers/all-MiniLM-L6-v2 used in this project.
AWS: For providing the infrastructure through DynamoDB to store and retrieve vector embeddings.
