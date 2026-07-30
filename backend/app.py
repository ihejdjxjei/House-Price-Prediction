from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pandas as pd


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model
model = joblib.load("house_price_model.pkl")
encoders = joblib.load("label_encoder.pkl")


@app.get("/")
def home():
    return {"message": "Backend is running"}


@app.post("/predict")
async def predict(request: Request):

    try:

        data = await request.json()

        print("Input:")
        print(data)


        # Add missing column
        data["Price (in rupees)"] = 0


        # Convert to dataframe
        df = pd.DataFrame([data])


        # Encode categorical columns
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


        return {
            "predicted_price": float(prediction[0])
        }


    except Exception as e:

        print("ERROR:")
        print(e)

        return {
            "error": str(e)
        }