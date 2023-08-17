from fastapi import FastAPI,Request
import json
import os
import pandas as pd
from datetime import datetime
from models.manic_data import ResponseModel,ErrorResponseModel

import motor.motor_asyncio

def active_duration_per_day(df:pd.DataFrame):
    df_active=df.groupby('Date').aggregate('sum')
    df_active.reset_index(inplace=True)
    df_active['Duration'] = df_active.Duration.apply(lambda x:round(x,2))
    df_active['Date'] = df_active.Date.apply(lambda x:x.strftime('%Y-%m-%d'))
    return df_active


MONGO_URL = os.environ['MONGO_URL']

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

manic_data = client['manic-time-data']

app = FastAPI()

@app.get("/api/manic/{data_name}")
async def hello_world(request:Request,data_name,dateRange,groupby,maxDisplay=0):
    
    query_date = json.loads(dateRange)
    date_start = datetime.strptime(query_date['start'], "%Y-%m-%d")
    date_end = datetime.strptime(query_date['end'], "%Y-%m-%d")

    user = request.headers['token']
    cursor = manic_data[user].find({'Date': {'$gte': date_start,'$lte':date_end}},{'_id':0,'Date':1,'Duration':1})
    
    df = pd.DataFrame([i async for i in cursor])
    if len(df) == 0:
        return ErrorResponseModel('No Data Found',404,'Failed')
   
    #print(cursor)
    #df = pd.DataFrame(cursor)
    data = active_duration_per_day(df).to_json(orient='records')
    print(data)
    return ResponseModel(data,'Ok')


