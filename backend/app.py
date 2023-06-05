from flask_pymongo import PyMongo
from flask import Flask, jsonify, request
import yaml
from router import register_routes
from flask_cors import CORS

class Server(Flask):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.config['MONGO_URI'] = 'mongodb://localhost:27017/assesment'  # Update with your MongoDB URI
        self.mongo = PyMongo(self)

def create_app():
    app = Server(__name__)
    CORS(app)  # Enable CORS

    # Load configuration from YAML file
    def load_config_from_yaml(app, filename):
        with open(filename, 'r') as f:
            config = yaml.safe_load(f)
            app.config['MONGO_URI'] = config['mongo_uri']

    # Load configurations
    load_config_from_yaml(app, 'database.yaml')

    # Register the routes
    register_routes(app)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)