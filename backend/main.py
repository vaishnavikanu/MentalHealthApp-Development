from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine
from models import Base
from routers.settings_routes import router as settings_router
from routers.auth import router as auth_router
from routers.moods import router as mood_router
from routers.journals import router as journal_router
from routers.chat import router as chat_router
from routers.history import router as history_router
from routers.upload import router as upload_router
app = FastAPI()
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(mood_router)
app.include_router(journal_router)
app.include_router(chat_router)
app.include_router(history_router)
app.include_router(settings_router)
app.include_router(upload_router)
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Backend working successfully"}