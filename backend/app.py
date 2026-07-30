from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd


app = Flask(__name__)
CORS(app)



model = joblib.load("house_price_model.pkl")
encoders = joblib.load("label_encoder.pkl")


@app.route("/")
def home():
    return "Backend is running"



@app.route("/predict", methods=["POST"])
def predict():

    try:

        data = request.json

        print("Input:")
        print(data)


     
        data["Price (in rupees)"] = 0


        
        df = pd.DataFrame([data])


        
        for col, encoder in encoders.items():

            if col in df.columns:

                df[col] = encoder.transform(
                    df[col].astype(str)
                )


        
            columns = [
            'Index',
            'Price (in rupees)',
            'location',
            'Carpet Area',
            'Status',
            'Floor',
            'Transaction',
            'Furnishing',
            'facing',
            'overlooking',
            'Bathroom',
            'Balcony',
            'Car Parking',
            'Ownership',
            'Super Area'
        ]


        df = df[columns]


        # Prediction
        prediction = model.predict(df)


        return jsonify({
            "predicted_price": float(prediction[0])
        })


    except Exception as e:

        print("ERROR:")
        print(e)

        return jsonify({
            "error": str(e)
        }), 400




if __name__ == "__main__":
    app.run(debug=True)