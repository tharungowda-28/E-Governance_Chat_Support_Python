from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

responses = {
    "hi": ["Hello!", "Hi there!", "Hi, how are you?"],
    "how are you": ["I'm doing well, thanks for asking!", "I'm fine, how about you?"],
    "what's your name": ["My name is Chatbot.", "You can call me Chatbot."],
    "bye": ["Goodbye!", "Bye!", "See you later!"],
    "we have problem with roads": ['<a href="https://transport.karnataka.gov.in/" target="_blank">Road Transport Information</a>'],
    "i want to place a complaint": ['<a href="https://ksp.karnataka.gov.in/" target="_blank">Place a Complaint</a>'],
    "i want to know about labour department": ['<a href="https://labour.karnataka.gov.in/" target="_blank">Labour Department Info</a>'],
    "i want to get news about education department": ['<a href="https://primaryedu.karnataka.gov.in/" target="_blank">Education Department News</a>'],
    "i want transportation information of karnataka": ['<a href="https://transport.karnataka.gov.in/" target="_blank">Transportation Info</a>'],
    "i want to know about medical info of karnataka": ['<a href="https://dme.karnataka.gov.in/" target="_blank">Medical Information</a>'],
    "i want to know about agriculture information": ['<a href="https://raitamitra.karnataka.gov.in/" target="_blank">Agriculture Information</a>'],
    "i want to know about horticulture": ['<a href="https://horticulturedir.karnataka.gov.in/" target="_blank">Horticulture Information</a>'],
    "emergency": ["Call 112"],
    "more": ['<a href="https://karnataka.gov.in/department" target="_blank">More Information</a>'],
    "default": ["Sorry, I didn't understand that.", "Could you please rephrase that?", "I'm not sure I follow."]
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response():
    user_input = request.json.get('user_input').lower()
    if user_input in responses:
        bot_response = responses[user_input]
    else:
        bot_response = responses["default"]
    return jsonify(response=bot_response)

if __name__ == '__main__':
    app.run(debug=True)
