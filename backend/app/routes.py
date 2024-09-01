from flask import Blueprint, request, jsonify
from . import mongo
from bson import ObjectId
from flask_jwt_extended import jwt_required, get_jwt_identity

bp = Blueprint('routes', __name__)

@bp.route('/api/anamnesis', methods=['POST'])
@jwt_required()
def create_anamnesis():
    try:
        user_email = get_jwt_identity()
        user = mongo.db.users.find_one({"email": user_email})
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        data = request.json
        data["user_id"] = user["_id"]  # Usando o ObjectId do usuário
        anamnesis_id = mongo.db.anamnesis.insert_one(data).inserted_id
        return jsonify({"id": str(anamnesis_id)}), 201
    except Exception as e:
        print(f"Erro ao criar anamnese: {str(e)}")  # Log detalhado
        return jsonify({"error": "Erro interno ao criar anamnese"}), 500

@bp.route('/api/anamnesis/<id>', methods=['GET'])
@jwt_required()
def get_anamnesis(id):
    user_email = get_jwt_identity()
    try:
        user = mongo.db.users.find_one({"email": user_email})
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        anamnesis = mongo.db.anamnesis.find_one_or_404({"_id": ObjectId(id), "user_id": user["_id"]})
        return jsonify({
            "historico_medico": anamnesis.get("historico_medico"),
            "alergias": anamnesis.get("alergias"),
            "medicamentos": anamnesis.get("medicamentos")
        })
    except Exception as e:
        print(f"Erro ao buscar anamnese: {str(e)}")  # Log detalhado
        return jsonify({"error": "Anamnese não encontrada"}), 404

@bp.route('/api/anamnesis/<id>', methods=['PUT'])
@jwt_required()
def update_anamnesis(id):
    user_email = get_jwt_identity()
    data = request.json
    try:
        user = mongo.db.users.find_one({"email": user_email})
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        result = mongo.db.anamnesis.update_one({"_id": ObjectId(id), "user_id": user["_id"]}, {"$set": data})
        if result.matched_count:
            return jsonify({"message": "Anamnese atualizada com sucesso"})
        else:
            return jsonify({"error": "Anamnese não encontrada"}), 404
    except Exception as e:
        print(f"Erro ao atualizar anamnese: {str(e)}")  # Log detalhado
        return jsonify({"error": "Erro interno ao atualizar anamnese"}), 500

@bp.route('/api/anamnesis/<id>', methods=['DELETE'])
@jwt_required()
def delete_anamnese(id):
    user_email = get_jwt_identity()
    try:
        user = mongo.db.users.find_one({"email": user_email})
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        result = mongo.db.anamnesis.delete_one({"_id": ObjectId(id), "user_id": user["_id"]})
        if result.deleted_count:
            return jsonify({"message": "Anamnese excluída com sucesso"})
        else:
            return jsonify({"error": "Anamnese não encontrada"}), 404
    except Exception as e:
        print(f"Erro ao excluir anamnese: {str(e)}")  # Log detalhado
        return jsonify({"error": "Erro interno ao excluir anamnese"}), 500


@bp.route('/api/anamnesis/', methods=['GET'])
@jwt_required()
def get_all_anamnesis():
    user_email = get_jwt_identity()
    try:
        user = mongo.db.users.find_one({"email": user_email})
        if not user:
            return jsonify({"error": "Usuário não encontrado"}), 404
        
        all_anamnesis = mongo.db.anamnesis.find({"user_id": user["_id"]})
        anamnese_list = []
        for anamnese in all_anamnesis:
            anamnese_list.append({
                'id': str(anamnese['_id']),
                'historico_medico': anamnese.get('historico_medico', ''),
                'alergias': anamnese.get('alergias', ''),
                'medicamentos': anamnese.get('medicamentos', '')
            })
        return jsonify(anamnese_list), 200
    except Exception as e:
        print(f"Erro ao buscar anamneses: {str(e)}")  # Log detalhado
        return jsonify({"error": "Erro interno ao buscar anamneses"}), 500
