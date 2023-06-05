from flask import jsonify, render_template, request
from bson.objectid import ObjectId

def register_routes(app):
    @app.route('/')
    def index():
        return render_template('home.html')

    @app.route('/transaction', methods=['GET'])
    def transaction():
        # Get pagination parameters from the URL
        page = request.args.get('page', default=1, type=int)
        per_page = request.args.get('per_page', default=2, type=int)

        # Calculate the offset based on the page and per_page values
        offset = (page - 1) * per_page

        # Retrieve data from MongoDB with pagination
        mongo = app.mongo
        data = mongo.db.transactions.find().skip(offset).limit(per_page)

        # Convert MongoDB cursor to a list of dictionaries with serialized ObjectId
        data_list = []
        for item in data:
            # Convert ObjectId to string
            item['_id'] = str(item['_id'])
            data_list.append(item)

        # Return the data as JSON response
        return jsonify(data_list)

    @app.route('/users', methods=['POST', 'GET'])
    def users():
        if request.method == 'POST':
            # Code for handling POST request
            return jsonify({'message': 'POST request handled'})

        elif request.method == 'GET':
            # Code for handling GET request
            return jsonify({'message': 'GET request handled'})

    @app.route('/users/<string:user_id>', methods=['GET', 'DELETE', 'PUT'])
    def user(user_id):
        if request.method == 'GET':
            # Code for handling GET request with user_id parameter
            return jsonify({'message': 'GET request handled with user_id'})

        elif request.method == 'DELETE':
            # Code for handling DELETE request with user_id parameter
            return jsonify({'message': 'DELETE request handled with user_id'})

        elif request.method == 'PUT':
            # Code for handling PUT request with user_id parameter
            return jsonify({'message': 'PUT request handled with user_id'})