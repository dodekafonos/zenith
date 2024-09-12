from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash  
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from . import mongo

bp = Blueprint('user_routes', __name__)

@bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        
        if 'name' not in data or 'email' not in data or 'password' not in data:
            return jsonify({"message": "Dados insuficientes fornecidos"}), 400
        
        name = data['name']
        email = data['email']
        password = data['password']
        
        # Verifica se o campo 'role' foi fornecido, caso contrário define como 'user'
        role = data.get('role', 'user')  
        
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256') 
        
        if mongo.db.users.find_one({"email": email}):
            return jsonify({"message": "Email já cadastrado"}), 400
        
        mongo.db.users.insert_one({
            'name': name,
            'email': email,
            'password': hashed_password,
            'role': role
        })
        
        return jsonify({"message": "Usuário registrado com sucesso"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    


@bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        if 'email' not in data or 'password' not in data:
            return jsonify({"message": "Dados insuficientes fornecidos"}), 400
        
        email = data['email']
        password = data['password']
        
        user = mongo.db.users.find_one({"email": email})
        if user and check_password_hash(user['password'], password):
            access_token = create_access_token(identity={"email": email, "role": user.get("role", "user")})
            return jsonify({"access_token": access_token}), 200
        else:
            return jsonify({"message": "Email ou senha inválidos"}), 401
    except Exception as e:
        return jsonify({"message": str(e)}), 500



@bp.route('/home', methods=['GET'])
@jwt_required()
def home():
    try:
        current_user = get_jwt_identity()
        print(f"Usuário atual: {current_user}")  # Adicione este log
        
        user = mongo.db.users.find_one({"email": current_user['email']})
        print(f"Usuário encontrado: {user}")  # Adicione este log
        
        if user:
            return jsonify({
                "message": "Bem-vindo ao painel de controle",
                "user": {
                    "name": user['name'],
                    "email": user['email'],
                    "role": user['role']  # Inclui o papel do usuário na resposta
                }
            }), 200
        else:
            return jsonify({"message": "Usuário não encontrado"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500


@bp.route('/admin', methods=['GET'])
@jwt_required()
def admin_dashboard():
    try:
        current_user = get_jwt_identity()
        
        # Verifica se o usuário é um admin
        if current_user['role'] != 'admin':
            return jsonify({"message": "Acesso negado"}), 403
        
        return jsonify({"message": "Bem-vindo ao painel administrativo"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
