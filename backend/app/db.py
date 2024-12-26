from pymongo import MongoClient

def get_database():
    try:
        # Connection string
        MONGO_URI = "mongodb+srv://root:12345@diverseminddb.mqqat.mongodb.net/?retryWrites=true&w=majority&appName=DiverseMindDB"

        # Create a MongoDB client
        client = MongoClient(MONGO_URI)

        # Test connection by listing databases
        databases = client.list_database_names()
        print("MongoDB Connection Successful!")
        print(f"Databases: {databases}")
        
        # Return the database object
        return client["DiverseMindDB"]
    except Exception as e:
        print("MongoDB Connection Failed!")
        print(f"Error: {e}")
        return None  # Corrected indentation
