from flask import Flask
from .database import init_db
from .routes import api_blueprint

def create_app():
    app = Flask(__name__)
    
    # Inicializa o banco de dados
    init_db(app)

    # Registra as rotas
    app.register_blueprint(api_blueprint)

    return app
