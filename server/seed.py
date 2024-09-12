#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from werkzeug.security import generate_password_hash

from app import app, db
from models import User, Event, Speaker, event_speakers

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting data...")
