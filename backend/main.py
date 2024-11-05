from app import create_app

app = create_app()

print("Rotas Registradas:")
for rule in app.url_map.iter_rules():
    print(f"{rule.endpoint}: {rule}")

if __name__ == "__main__":
    app.run(debug=True)
