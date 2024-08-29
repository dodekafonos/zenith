from flask import request, jsonify, current_app as app
from . import mongo

@app.route('/api/anamnesis', methods=['POST'])
def create_anamnesis():
    data = request.json
    if not data or not 'user_id' in data:
        return jsonify({"error": "Missing data"}), 400

    anamnesis_data = {
        "user_id": data['user_id'],
        "medical_history": data.get('medical_history'),
        "allergies": data.get('allergies'),
        "medications": data.get('medications')
    }

    mongo.db.anamnesis.insert_one(anamnesis_data)
    return jsonify({"msg": "Anamnesis record created"}), 201

@app.route('/api/anamnesis/<user_id>', methods=['GET'])
def get_anamnesis(user_id):
    anamnesis_record = mongo.db.anamnesis.find_one({"user_id": user_id})
    if not anamnesis_record:
        return jsonify({"error": "No record found"}), 404

    return jsonify(anamnesis_record), 200

@app.route('/api/anamnesis/<user_id>', methods=['DELETE'])
def delete_anamnesis(user_id):
    result = mongo.db.anamnesis.delete_one({"user_id": user_id})
    if result.deleted_count == 0:
        return jsonify({"error": "No record found to delete"}), 404

    return jsonify({"msg": "Anamnesis record deleted"}), 200
