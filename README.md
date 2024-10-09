# Insurance Image Vector Search Demo - MongoDB 

Inside the backend folder, create a .env file and add your MongoDB connection string using the following format:

```bash

MONGO_URI="mongodb+srv://<usr>:<pswd>@<cluster-name>.mongodb.net/"
```

In MongoDB Atlas, create a database called demo_rag_insurance and a collection called claims_final. Import the dataset demo_rag_insurance.claims.json into this collection.

## MongoDB Vector Search Index 

Create a vector index for the photoEmbedding field in your collection to enable efficient similarity search using vector embeddings. This index will compare image embeddings based on cosine similarity. Ensure the numDimensions matches the output size of your embedding model.

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "photoEmbedding",
      "numDimensions": 1000,
      "similarity": "cosine"
    }
  ]
}
```

## Docker Setup Instructions

To run the application using Docker, follow these setup steps:

### Build the Application

To build the Docker images and start the services, run the following command:
```
make build
```

### Stopping the Application

To stop all running services, use the command:
```
make stop
```

### Cleaning Up

To remove all images and containers associated with the application, execute:
```
make clean
```