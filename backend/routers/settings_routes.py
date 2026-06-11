from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import (
    Mood,
    Journal,
    ChatSession,
    Message
)
from database_session import get_db

router = APIRouter()


@router.delete("/clear-data/{user_id}")
def clear_all_data(
    user_id: int,
    db: Session = Depends(get_db)
):

    # DELETE MOODS
    db.query(Mood).filter(
        Mood.user_id == user_id
    ).delete()

    # DELETE JOURNALS
    db.query(Journal).filter(
        Journal.user_id == user_id
    ).delete()

    # GET USER CHAT SESSIONS
    sessions = db.query(ChatSession).filter(
        ChatSession.user_id == user_id
    ).all()

    # DELETE MESSAGES OF EACH SESSION
    for session in sessions:

        db.query(Message).filter(
            Message.session_id == session.id
        ).delete()

    # DELETE CHAT SESSIONS
    db.query(ChatSession).filter(
        ChatSession.user_id == user_id
    ).delete()

    db.commit()

    return {
        "message":
        "All user data deleted successfully"
    }
    
@router.delete("/clear-chat-history/{user_id}")
def clear_chat_history(
    user_id: int,
    db: Session = Depends(get_db)
):

    sessions = db.query(ChatSession).filter(
        ChatSession.user_id == user_id
    ).all()

    for session in sessions:

        db.query(Message).filter(
            Message.session_id == session.id
        ).delete()

    db.query(ChatSession).filter(
        ChatSession.user_id == user_id
    ).delete()

    db.commit()

    return {
        "message": "Chat history deleted"
    }