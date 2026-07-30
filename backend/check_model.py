import os
import joblib


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "house_price_model.pkl")
encoder_path = os.path.join(BASE_DIR, "label_encoder.pkl")

print("Model Path:", model_path)
print("Encoder Path:", encoder_path)

print("Model Exists:", os.path.exists(model_path))
print("Encoder Exists:", os.path.exists(encoder_path))

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found: {model_path}")

if not os.path.exists(encoder_path):
    raise FileNotFoundError(f"Encoder not found: {encoder_path}")

model = joblib.load(model_path)
encoders = joblib.load(encoder_path)

print("\n========== MODEL FEATURES ==========")

if hasattr(model, "feature_names_in_"):
    print(model.feature_names_in_)
else:
    print("feature_names_in_ not available")

print("\n========== ENCODERS ==========")
print(encoders.keys())

for col, encoder in encoders.items():
    print(f"\n{col}")
    print(list(encoder.classes_))