import { createAsyncThunk } from "@reduxjs/toolkit";
import { FetchGet,FetchNewapi } from "../../dataFetchingHelpers/fetchActions";



export const FectallArticles=createAsyncThunk(
    'ActiclesAction/fetchAllArticles',
    async ({ endUrl }: { endUrl: string,}) => {
        const response = await FetchGet(endUrl)
        // console.log("all data fetch",response);
        return response
    }
)

export const Fetchbykeywords = createAsyncThunk(
    'ActiclesAction/fetchArticlesByKeyWords',
    async ({endUrl} : {endUrl : string}) =>{
        const response = await FetchGet(endUrl)
        return response
    }
)

export const NewApidata = createAsyncThunk(
    'ActiclesAction/newapi',
    async () =>{
        // const response = await FetchGet("https://books39.p.rapidapi.com/CZFA4F/books")
        const response = await FetchNewapi("https://reqres.in/api/products")
        // https://reqres.in/api/products/3
        console.log("Response for newapi",response)
        return response
    }
)


