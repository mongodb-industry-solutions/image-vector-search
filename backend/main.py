from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import APIRouter
from image_search import image_search

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()

@app.post("/imageSearch")
async def find_similar_images(request: Request):
    data = await request.json()
    droppedImage = data.get("droppedImage") 
    similar_documents = image_search(droppedImage)
    return {"similar_documents": similar_documents}