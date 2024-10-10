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
```bash
make build
```

### Stopping the Application

To stop all running services, use the command:
```bash
make stop
```

### Cleaning Up

To remove all images and containers associated with the application, execute:
```bash
make clean
```

## **Deploy on AWS EC2 Instance**

In this guide, we'll deploy on a **t2.micro** instance running **Ubuntu Server 24.04 LTS**.

### **Step 1: Create the EC2 Instance**
- Launch a t2.micro EC2 instance with Ubuntu Server 24.04 LTS from the AWS Console.

### **Step 2: SSH into the Instance**
Once the instance is up and running, SSH into the machine using the following command:

```bash
ssh ec2-user@<your-ec2-ip-address>
```

### **Step 3: Update the Package Index**
Before installing any packages, it's good practice to update the package index:

```
sudo apt update
```

### **Step 4: Install Docker**
Install Docker on your EC2 instance by running the following command:

```
sudo apt install docker.io -y
```

Verify the installation by checking the Docker version:
```
docker --version
```

### **Step 5: Install Docker Compose**
Download Docker Compose:
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Make Docker Compose executable:
```
sudo chmod +x /usr/local/bin/docker-compose
```

Check the Docker Compose version:
```
docker-compose --version
```

### **Step 6: Start and Enable Docker Service**
Start the Docker service:
```
sudo systemctl start docker
```

Enable Docker to start on boot:
```
sudo systemctl enable docker
```
