from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import json
import os
import pandas as pd
import time
from datetime import datetime
from models.base import ResponseModel, ErrorResponseModel
from natsort import natsort_keygen

import motor.motor_asyncio

# TODO: migrate to pure nextjs backend? use D3.js


def active_duration_group_by(df: pd.DataFrame, groupby) -> pd.DataFrame:
    df_active = df.groupby(
        "Date" if groupby == "Day" else groupby, as_index=False
    ).Duration.sum()
    df_active["Duration"] = df_active.Duration.apply(lambda x: round(x, 2))
    if groupby == "Day":
        df_active["Date"] = df_active["Date"].apply(lambda x: x.strftime("%Y-%m-%d"))
        
    df_active.sort_values(
    by="Date" if groupby == "Day" else groupby,
    key=natsort_keygen(),inplace=True
)

    avg = round(df_active["Duration"].mean(), 2)
    max = df_active["Duration"].max()
    max_days = df_active[df_active["Duration"] == max][
        "Date" if groupby == "Day" else groupby
    ].to_list()

    data_info = {
        "x": "Date" if groupby == "Day" else groupby,
        "y": ["Duration"],
        "avg": avg,
        "max": max,
        "max_days": max_days,
    }

    return [df_active, data_info]


def often_used_apps(df: pd.DataFrame, max_display) -> pd.DataFrame:
    df_apps = df.groupby("Process", as_index=False).Duration.sum()
    df_apps = df_apps.sort_values(by="Duration", ascending=False)
    return df_apps[0:max_display]


def apps_duration_group_by(df: pd.DataFrame, groupby, max_display):
    df_often_used = often_used_apps(df, max_display)
    apps = df_often_used.Process.to_list()
    df_apps = df.loc[df["Process"].isin(apps), :]
    df_apps = df_apps.groupby(
        ["Process", "Date" if groupby == "Day" else groupby], as_index=False
    ).Duration.sum()
    df_apps["Duration"] = df_apps.Duration.apply(lambda x: round(x, 2))
    if groupby == "Day":
        df_apps["Date"] = df_apps["Date"].apply(lambda x: x.strftime("%Y-%m-%d"))
    df_apps = df_apps.set_index(
        ["Date" if groupby == "Day" else groupby, "Process"]
    ).Duration.unstack()
    df_apps.reset_index(inplace=True)
    df_apps.sort_values(by="Date" if groupby == "Day" else groupby, key=natsort_keygen(),inplace=True)
    
    df_often_used['Duration'] = df_often_used.Duration.apply(lambda x: round(x, 2))
    top2 = df_often_used[0:2].to_json(orient='records')
    
    data_info = {
        "x": "Date" if groupby == "Day" else groupby,
        "y": apps,
        "max_display": max_display,
        "top2":top2,
    }

    return [df_apps, data_info]


MONGO_URL = os.getenv("MONGO_URL")

# print(MONGO_URL)

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

manic_data = client["manic-time-data"]

app = FastAPI()


# TODO: add query params validation
@app.get(
    "/api/manic/{data_name}",
    response_model=ResponseModel,
    responses={
        404: {"model": ErrorResponseModel, "description": "Data Not found!"},
        200: {"description": "Get Manic Time Data Succussfully!"},
    },
)
async def manic_time_data(
    request: Request, data_name, dateRange, groupby, maxDisplay=0
):
    print("start", datetime.now())

    query_date = json.loads(dateRange)
    date_start = datetime.strptime(query_date["start"], "%Y-%m-%d")
    date_end = datetime.strptime(query_date["end"], "%Y-%m-%d")
    maxDisplay = int(maxDisplay)

    time_stamp = int(time.time())

    user = "asante"  # request.headers['token']
    match data_name:
        case "active":
            cursor = manic_data[user].find(
                {"Date": {"$gte": date_start, "$lte": date_end}},
                {"_id": 0, "Date" if groupby == "Day" else groupby: 1, "Duration": 1},
            )
            print("get cursor", datetime.now())
            df = pd.DataFrame([i async for i in cursor])
            print("get df", datetime.now())

            if len(df) == 0:
                return JSONResponse(
                    status_code=404,
                    content={
                        "error": "Wrong Data Range",
                        "message": "Data Not found",
                        "time_stamp": time_stamp,
                    },
                )

            data, data_info = active_duration_group_by(df, groupby=groupby)

            print("get data", datetime.now())

        case "apps":
            cursor = manic_data[user].find(
                {"Date": {"$gte": date_start, "$lte": date_end}},
                {
                    "_id": 0,
                    "Date" if groupby == "Day" else groupby: 1,
                    "Duration": 1,
                    "Process": 1,
                },
            )
            df = pd.DataFrame([i async for i in cursor])

            if len(df) == 0:
                return JSONResponse(
                    status_code=404,
                    content={
                        "error": "Wrong Data Range",
                        "message": "Data Not found",
                        "time_stamp": time_stamp,
                    },
                )

            data, data_info = apps_duration_group_by(
                df, groupby=groupby, max_display=maxDisplay
            )

        case _:
            return JSONResponse(
                status_code=404,
                content={
                    "error": "Wrong Data Name",
                    "message": "Data Not found",
                    "time_stamp": time_stamp,
                },
            )

    # print(cursor)

    # print(cursor)
    # df = pd.DataFrame(cursor)
    data = data.to_json(orient="records")
    data_info = json.dumps(data_info)
    print(data_info)
    return {
        "data": data,
        "data_info": data_info,
        "message": "Ok",
        "time_stamp": time_stamp,
    }
