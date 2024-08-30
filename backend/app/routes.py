# app/routes.py

from flask import Blueprint, request, jsonify
from . import mongo
from bson import ObjectId

bp = Blueprint('routes', __name__)

@bp.route('/api/anamnesis', methods=['POST'])
def create_anamnesis():
    data = request.json
    anamnesis_id = mongo.db.anamnesis.insert_one(data).inserted_id
    return jsonify({"id": str(anamnesis_id)}), 201

@bp.route('/api/anamnesis/<id>', methods=['GET'])
def get_anamnesis(id):
    try:
        anamnesis = mongo.db.anamnesis.find_one_or_404({"_id": ObjectId(id)})
        return jsonify({
            "historico_medico": anamnesis.get("historico_medico"),
            "alergias": anamnesis.get("alergias"),
            "medicamentos": anamnesis.get("medicamentos")
        })
    except:
        return jsonify({"error": "Anamnese not found"}), 404

@bp.route('/api/anamnesis/<id>', methods=['PUT'])
def update_anamnesis(id):
    data = request.json
    result = mongo.db.anamnesis.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.matched_count:
        return jsonify({"message": "Anamnese updated successfully"})
    else:
        return jsonify({"error": "Anamnese not found"}), 404

@bp.route('/api/anamnesis/<id>', methods=['DELETE'])
def delete_anamnesis(id):
    result = mongo.db.anamnesis.delete_one({"_id": ObjectId(id)})
    if result.deleted_count:
        return jsonify({"message": "Anamnese deleted successfully"})
    else:
        return jsonify({"error": "Anamnese not found"}), 404

@bp.route('/api/anamnesis/', methods=['GET'])
def get_all_anamnesis():
    try:
        # Substitua 'anamnesis' pelo nome da coleção real
        all_anamnesis = mongo.db.anamnesis.find()  # Busca todos os registros
        # Converte o cursor para uma lista de dicionários
        anamnese_list = []
        for anamnese in all_anamnesis:
            # Adiciona o id manualmente ao dicionário
            anamnese_list.append({
                'id': str(anamnese['_id']),
                'historico_medico': anamnese.get('historico_medico', ''),
                'alergias': anamnese.get('alergias', ''),
                'medicamentos': anamnese.get('medicamentos', '')
            })
        return jsonify(anamnese_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500