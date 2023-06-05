from flask_pymongo import PyMongo
from flask import Flask, jsonify, request
import yaml
from router import register_routes
from flask_cors import CORS
import json

class Server(Flask):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.config['MONGO_URI'] = 'mongodb://localhost:27017/assessment'  # Update with your MongoDB URI
        self.mongo = PyMongo(self)

        # Create collection from JSON file if it doesn't exist
        with self.app_context():
            db = self.mongo.db
            collection = db['transactions']

            with open('db/mongodb.json', 'r') as f:
                # Load the JSON data as a list of dictionaries
                data = json.load(f)

                # Insert the default data into the collection
                collection.insert_many(data)

def create_app():
    app = Server(__name__)
    CORS(app)  # Enable CORS

    # Register the routes
    register_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)