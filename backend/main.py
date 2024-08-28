import sys
sys.path.append('/backend')

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
