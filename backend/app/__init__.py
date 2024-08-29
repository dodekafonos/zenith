from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os
from dotenv import load_dotenv

mongo = PyMongo()

def create_app():
    # Carregar variáveis de ambiente do arquivo .env
    load_dotenv()

    app = Flask(__name__)
    CORS(app)

    # Configurar a URI do MongoDB
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")

    # Inicializar o PyMongo com a aplicação
    mongo.init_app(app)

    # Definir as rotas
    @app.route('/')
    def home():
        return 'hello worldinario'

    @app.route('/api/data')
    def data():
        return jsonify({"message": "Hello from the API"})

    return app
