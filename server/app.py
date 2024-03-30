from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from keras.models import load_model
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler
import pickle
import numpy as np
from waitress import serve

app = Flask(__name__)
CORS(app)
model = load_model("../model/churn_model.h5")

gender_encoder = pickle.load(open('../gender_encoder.pkl','rb'))
country_encoder = pickle.load(open('../country_encoder.pkl','rb'))

scaler = pickle.load(open('../scaler.pkl','rb'))

@app.route('/')
def home():
    return "Hello buddy"

@app.route('/predict',methods=['POST'])
def predict():
    try:

        data = request.get_json()

        features = [data["creditScore"],data["geography"],data["gender"],data["age"],data["tenure"],
                    data["balance"],data["products"],data["creditCard"],data["activeMember"],data["estimateSalary"]]

        features[1] = country_encoder.transform([features[1]])[0]
        features[2] = gender_encoder.transform([features[2]])[0]

        features_arr = np.array(features).reshape(1, -1)
        
        features_scaled = scaler.transform(features_arr)
        
        prediction = model.predict(features_scaled)

        predicted_class = 1 if prediction[0][0] > 0.5 else 0
        predicted_probability = prediction[0][0] * 100

        result = { "customer_exist" : str(bool(predicted_class)),
                "probability": f"{predicted_probability:.2f}%"
                }
        
        return jsonify(result)

    except Exception as e:
        
        return jsonify({"error": str(e)})
    
    


if __name__ == '__main__':
    serve(app,host="0.0.0.0", port=5000)