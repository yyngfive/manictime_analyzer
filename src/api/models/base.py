from pydantic import BaseModel



class ResponseModel(BaseModel):
    data:str
    data_info:str
    code:int=200
    message:str
    time_stamp:int


class ErrorResponseModel(BaseModel):
    error:str
    message:str
    time_stamp:int