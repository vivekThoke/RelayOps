from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RealyOps API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "realyops-api"}

@app.get("/api/products")
def list_products():
    return {
        "product": [
            {
                "id": "SKU-001",
                "name": "Basmati Rice 25kg",
                "price": 1450.00,
                "stock": 24,
            },
            {
                "id": "SKU-002",
                "name": "Wheat Flour 10kg",
                "price": 420.00,
                "stock": 50,
            }
        ]
    }
    
