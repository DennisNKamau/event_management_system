#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from datetime import datetime
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from werkzeug.security import generate_password_hash


# Local imports
from models import db, User, Event, Speaker

# Instantiate app, set attributes
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Hello! Welcome to our event management app.</h1>'

# users' views
@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)

    elif request.method == 'POST':
        data = request.get_json()
        required_fields = ['first_name', 'last_name', 'email', 'phone_number', 'role', 'password']
        if not all(field in data for field in required_fields):
            return make_response(jsonify({"message": "Missing required fields"}), 400)

        new_user = User(
            first_name=data['first_name'],
            last_name=data['last_name'],
            email=data['email'],
            phone_number=data['phone_number'],
            role=data['role']
        )
        new_user.set_password(data['password'])  
        db.session.add(new_user)
        db.session.commit()

        user_dict = new_user.to_dict()
        return make_response(jsonify(user_dict), 201)

@app.route('/users/<int:user_id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(user_id):
    user = User.query.get(user_id)

    if not user:
        response_body = {"message": "User not found. Please try again."}
        return make_response(jsonify(response_body), 404)
    
    if request.method == 'GET':
        return make_response(jsonify(user.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            if key == 'password':
                user.set_password(value)
            else:
                setattr(user, key, value)

        db.session.commit()
        return make_response(jsonify(user.to_dict()), 200)

    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body = {"delete_successful": True, "message": "User deleted successfully."}
        return make_response(jsonify(response_body), 200)

# events views
@app.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        events = [event.to_dict() for event in Event.query.all()]
        return make_response(jsonify(events), 200)

    elif request.method == 'POST':
        data = request.get_json()
        print(f"Received data: {data}")  # Log the received data for debugging
        name = data.get('name')
        description = data.get('description')
        location = data.get('location')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        created_by = data.get('created_by')

        # Log the date strings for debugging
        print(f"start_time: {start_time}")
        print(f"end_time: {end_time}")

        # Ensure the received datetime strings are in the correct format
        try:
            # Parse the datetime fields
            start_time = datetime.fromisoformat(data['start_time'])
            end_time = datetime.fromisoformat(data['end_time'])

            # Create the event
            new_event = Event(
                name=data['name'],
                description=data['description'],
                location=data['location'],
                start_time=start_time,
                end_time=end_time,
                created_by=data['created_by']
            )
            db.session.add(new_event)
            db.session.commit()
            return jsonify({"message": "Event created successfully"}), 200

        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except KeyError as e:
            return jsonify({"error": f"Missing field {str(e)}"}), 400


@app.route('/events/<int:event_id>', methods=['GET', 'PATCH', 'DELETE'])
def event_by_id(event_id):
    event = Event.query.get(event_id)

    if not event:
        response_body = {"message": "This event does not exist. Please try again."}
        return make_response(jsonify(response_body), 404)
    
    if request.method == 'GET':
        return make_response(jsonify(event.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(event, key, value)

        db.session.commit()

        return make_response(jsonify(event.to_dict()), 200)

    elif request.method == 'DELETE':
        db.session.delete(event)
        db.session.commit()

        response_body = {"delete_successful": True, "message": "Event deleted successfully."}
        return make_response(jsonify(response_body), 200)

# views for speakers
@app.route('/speakers', methods=['GET', 'POST'])
def speakers():
    if request.method == 'GET':
        speakers = [speaker.to_dict() for speaker in Speaker.query.all()]
        return make_response(jsonify(speakers), 200)

    elif request.method == 'POST':
        data = request.get_json()
        required_fields = ["first_name", "last_name", "email", "phone_number", "image"]
        if not all(field in data for field in required_fields):
            return make_response(jsonify({"message": "Missing required fields"}), 400)

        new_speaker = Speaker(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone_number=data["phone_number"],
            image=data["image"]
        )
        db.session.add(new_speaker)
        db.session.commit()
        return make_response(jsonify(new_speaker.to_dict()), 201)

@app.route('/speakers/<int:speaker_id>', methods=['GET', 'PATCH', 'DELETE'])
def speaker_by_id(speaker_id):
    speaker = Speaker.query.get(speaker_id)

    if not speaker:
        response_body = {"message": "This speaker does not exist. Please try again."}
        return make_response(jsonify(response_body), 404)
    
    if request.method == 'GET':
        return make_response(jsonify(speaker.to_dict()), 200)

    elif request.method == 'PATCH':
        data = request.get_json()
        for key, value in data.items():
            setattr(speaker, key, value)

        db.session.commit()
        return make_response(jsonify(speaker.to_dict()), 200)

    elif request.method == 'DELETE':
        db.session.delete(speaker)
        db.session.commit()
        response_body = {"delete_successful": True, "message": "Speaker deleted successfully."}
        return make_response(jsonify(response_body), 200)

if __name__ == '__main__':
    app.run(debug=True)
