from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from models import User
from database_session import get_db

from schemas import (
    UserSignup,
    UserLogin
)

router = APIRouter()

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

# SIGNUP
@router.post("/signup")
def signup(
    user_data: UserSignup,
    db: Session = Depends(get_db)
):

    # CHECK EMAIL
    existing_email = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_email:
        return {
            "message": "Email already exists"
        }

    # CHECK USERNAME
    existing_username = db.query(User).filter(
        User.username == user_data.username
    ).first()

    if existing_username:
        return {
            "message": "Username already exists"
        }

    # HASH PASSWORD
    hashed_password = pwd_context.hash(
        user_data.password
    )

    # CREATE USER
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password=hashed_password,
        role=user_data.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "username": new_user.username,
            "email": new_user.email,
            "role": new_user.role
        }
    }

# LOGIN
@router.post("/login")
def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):

    # FIND USER
    user = db.query(User).filter(
        User.email == login_data.email,
        User.role == login_data.role
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    # VERIFY PASSWORD
    if not pwd_context.verify(
        login_data.password,
        user.password
    ):
        return {
            "message": "Incorrect password"
        }

    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }
    
@router.get("/patients")
def get_patients(
    db: Session = Depends(get_db)
):

    patients = db.query(User).filter(
        User.role == "patient"
    ).all()

    return patients    