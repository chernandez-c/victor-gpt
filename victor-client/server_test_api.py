from flask import Flask, jsonify, make_response, request
from flask_cors import CORS

SECRET = "42"

app = Flask(__name__)
CORS(app)

messages = [
    {'author': 'Admin', 'text': 'Prueba a enviarme un mensaje.'},
    {'author': 'Victor', 'text': 'Soy Víctor.'}
]

@app.route('/messages', methods=['GET', 'POST'])
def messages_endpoint():
    if request.method == 'GET':
        return jsonify(messages)
    elif request.method == 'POST':
        data = request.get_json()

        author = 'Victor'
        if 'adminKey' in data and data['adminKey'] == SECRET:
            author = 'Admin'

        new_message = {'text': data['text'], 'author': author}
        messages.append(new_message)

        return jsonify(new_message), 201

if __name__ == '__main__':
    app.run()
