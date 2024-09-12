from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import pytz

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)

def utcnow():
    return datetime.now(pytz.utc)

# Association table for many-to-many relationship between Event and Speaker
event_speakers = db.Table('event_speakers',
    db.Column('event_id', db.Integer, db.ForeignKey('events.event_id'), primary_key=True),
    db.Column('speaker_id', db.Integer, db.ForeignKey('speakers.id'), primary_key=True),
    db.Column('role', db.String(50), nullable=False)  # Additional field
)

class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'
    
    event_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    location = db.Column(db.String(200), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=utcnow, onupdate=utcnow)

    # Relationship with User model
    organizer = db.relationship('User', back_populates='events')

    # Relationship with Speaker model
    speakers = db.relationship('Speaker', secondary=event_speakers, back_populates='events')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Event name is required')
        return name

    @validates('location')
    def validate_location(self, key, location):
        if not location:
            raise ValueError('Event location is required')
        return location

    @validates('start_time', 'end_time')
    def validate_time(self, key, time):
        if not time:
            raise ValueError(f'{key} is required')
        return time
    
    def to_dict(self):
        return {
            "name": self.name,
            "description": self.description,
            "location": self.location,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat(),
            "created_by": self.created_by,
        }

    def __repr__(self):
        return f'<Event {self.name}>'

class Speaker(db.Model, SerializerMixin):
    __tablename__ = 'speakers'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)
    phone_number = db.Column(db.String(10), nullable=False)
    image = db.Column(db.String(80), nullable=True)
    
    # Relationship with Event model
    events = db.relationship('Event', secondary=event_speakers, back_populates='speakers')

    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError('First name is required')
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name:
            raise ValueError('Last name is required')
        return last_name
    
    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('Invalid email address')
        return address
    
    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        if len(phone_number) != 10 or not phone_number.isdigit():
            raise ValueError('Phone number must be 10 digits long')
        return phone_number

    def __repr__(self):
        return f'<Speaker {self.first_name} {self.last_name}>'

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    role = db.Column(db.String(50), nullable=False, default='attendee')
    created_at = db.Column(db.DateTime, nullable=False, default=utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=utcnow, onupdate=utcnow)
    events = db.relationship('Event', back_populates='organizer', lazy=True)

    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if not first_name:
            raise ValueError('First name is required')
        return first_name

    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if not last_name:
            raise ValueError('Last name is required')
        return last_name

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('Invalid email address')
        return address

    @validates('phone_number')
    def validate_phone_number(self, key, phone_number):
        if phone_number and (len(phone_number) != 10 or not phone_number.isdigit()):
            raise ValueError('Phone number must be 10 digits long')
        return phone_number

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.first_name} {self.last_name}>'

    def to_dict(self):
        return {
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone_number": self.phone_number,
            "role": self.role,
        }

