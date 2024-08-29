import os
from dotenv import load_dotenv

load_dotenv()  # Carrega as variáveis do arquivo .env

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    MONGO_URI = os.getenv('MONGO_URI')

def configure_app(app):
    app.config.from_object(Config)
