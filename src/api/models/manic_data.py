from bson import ObjectId
from pydantic import BaseModel, Field
from datetime import datetime
import time

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class ManicModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    index: int = Field(...)
    Name: str = Field(...)
    Start: datetime = Field(...)
    End: datetime = Field(...)
    Duration: float = Field(...)
    Process: str = Field(...)
    Date: datetime = Field(...)
    Week: str = Field(...)
    Month: str = Field(...)
    Year: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "index": 0,
                "Name": "ManicTime",
                "Start": "2023-01-19T01:43:48.000+00:00",
                "End": "2023-01-19T01:44:16.000+00:00",
                "Duration": "0.0077777777777777776",
                "Process": "ManicTime",
                "Date": "2023-01-19T00:00:00.000+00:00",
                "Week": "2023-w3",
                "Month": "2023-1",
                "Year": "2023",
            }
        }


def ResponseModel(data, message):
    return {
        "data": data,
        "code": 200,
        "message": message,
        'time_stamp':int(time.time()),
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message,'time_stamp':int(time.time()),}
