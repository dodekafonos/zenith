from flask import Blueprint, jsonify, request
from .database import mongo
from .models import Usuario
from .schemas import UsuarioSchema

api_blueprint = Blueprint('api', __name__)

usuario_schema = UsuarioSchema()

# Criar usuário
@api_blueprint.route('/api/usuarios', methods=['POST'])
def create_usuario():
    data = request.get_json()
    errors = usuario_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    novo_usuario = Usuario(**data)
    result = mongo.db.usuarios.insert_one(novo_usuario.__dict__)
    novo_usuario.__dict__["_id"] = str(result.inserted_id)

    return jsonify(novo_usuario.__dict__), 201

# Listar usuários
@api_blueprint.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = mongo.db.usuarios.find()
    return jsonify([Usuario.to_json(usuario) for usuario in usuarios]), 200

# Buscar um usuário
@api_blueprint.route('/api/usuarios/<id>', methods=['GET'])
def get_usuario(id):
    usuario = mongo.db.usuarios.find_one({"_id": ObjectId(id)})
    if not usuario:
        return jsonify({"error": "Usuário não encontrado"}), 404

    return jsonify(Usuario.to_json(usuario)), 200

# Atualizar usuário
@api_blueprint.route('/api/usuarios/<id>', methods=['PUT'])
def update_usuario(id):
    data = request.get_json()
    errors = usuario_schema.validate(data)
    if errors:
        return jsonify(errors), 400

    result = mongo.db.usuarios.update_one({"_id": ObjectId(id)}, {"$set": data})
    
    if result.matched_count == 0:
        return jsonify({"error": "Usuário não encontrado"}), 404

    return jsonify({"message": "Usuário atualizado com sucesso"}), 200

# Deletar usuário
@api_blueprint.route('/api/usuarios/<id>', methods=['DELETE'])
def delete_usuario(id):
    result = mongo.db.usuarios.delete_one({"_id": ObjectId(id)})

    if result.deleted_count == 0:
        return jsonify({"error": "Usuário não encontrado"}), 404

    return jsonify({"message": "Usuário deletado com sucesso"}), 200
