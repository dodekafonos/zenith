from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

mongo = PyMongo()
jwt = JWTManager()

def create_app():
    load_dotenv()

    app = Flask(__name__)
    
    # Ajustar o CORS para permitir o domínio de origem correto
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY") 
    mongo.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        from .routes import bp as anamnesis_bp
        from .user_routes import bp as user_bp

        app.register_blueprint(anamnesis_bp)
        app.register_blueprint(user_bp, url_prefix='/users')

    return app
