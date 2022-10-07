import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FectallArticles } from "../actions/ArticlesActions";
import { Fetchbykeywords } from "../actions/ArticlesActions";


const ArticleSlice=createSlice({
        name:"articleslice",
        initialState:{
            data:null,
            isSuccess:false,
            message:"",
            isloading:false,
            currentpage:0,
            searchkeyword:null,
            selectedarticleslist:[],
            selectallarticleinpage:[],
            selectedallslice:false
        },

        
        reducers:{

            addcurrentpage : (state,action : PayloadAction<any>) => {
                return {
                    ...state,
                    currentpage : action["payload"]["currentpage"]
                }
            },

            addsearchkeyword : (state,action : PayloadAction<any>) => {
                return {
                    ...state,
                    searchkeyword : action["payload"]["searchkeyword"],
                    currentpage : 0
                }
            },

////////////////////////////////////
            addselectedarticles:(state,action:PayloadAction<any>)=>{
                return {
                    ...state,
                    selectedarticleslist:action['payload']["selectedarticleslist"]
                    
                }
            },


            addallarticlesinpage:(state,action:PayloadAction<any>)=>{
                return {
                    ...state,
                    selectallarticleinpage:action['payload']["selectallarticleinpage"]
                    
                }  
            },

/////////////////////////////////////////////////
            adddatalist:(state,action:PayloadAction<any>)=>{
                return {
                    ...state,
                    datalist:action["payload"]["datalist"]
                    
                }
            },


            addselectedalltoogle:(state,action:PayloadAction<any>)=>{
                return {
                    ...state,
                    selectedallslice:action["payload"]["selectedallslice"]
                    
                }
            },

        },

        extraReducers:(builder)=>
        {
            builder.addCase(FectallArticles.pending,(state,action: PayloadAction<any>)=>{
                state.isloading=true
            })

            builder.addCase(FectallArticles.fulfilled,(state, action: PayloadAction<any>)=>{
                state.isloading=false
                state.data=action["payload"]
                state.message=''
                
            })

            builder.addCase(FectallArticles.rejected,(state, action: PayloadAction<any>)=>{
                state.isloading=false
                state.data=null
                
            })


            builder.addCase(Fetchbykeywords.pending,(state,action: PayloadAction<any>)=>{
                state.isloading=true
            })

            builder.addCase(Fetchbykeywords.fulfilled,(state, action: PayloadAction<any>)=>{
                state.isloading=false
                state.data=action["payload"]
                state.message=''
                
            })

            builder.addCase(Fetchbykeywords.rejected,(state, action: PayloadAction<any>)=>{
                state.isloading=false
                state.data=null
                
            })

        }

    }
)


export const {addcurrentpage,addsearchkeyword,addselectedarticles,addallarticlesinpage,adddatalist,addselectedalltoogle} =ArticleSlice.actions
export default ArticleSlice.reducer;