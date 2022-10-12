import React, { useState,useEffect } from "react";
import { useAppSelector } from "../../redux/Hooks";
import { useAppDispatch } from "../../redux/Hooks";
import { NewApidata } from "../../redux/actions/ArticlesActions";




const UserEntryView = ({ label,userentry,setuserentry }) => {
    const fontResizerState = useAppSelector((state) => state.globalFontResizer);    
    const {newapidata}=useAppSelector((state)=>state.articleSlice)
    console.log(newapidata,"newApi data ____________-")
    let dispatch=useAppDispatch()

    useEffect(()=>{
        if(userentry.author)
        {            
            dispatch(NewApidata())
        }
    },[userentry])

     const setuservalues=(val)=>{    
      if(label=="Author")
      {        
        setuserentry({...userentry,author:val})
      }
     }    
     
    return (
      <div style={{postion:"relative"}}>
        <p
          className="no-margin text-green has-font-weight font-change-animation"
          style={{ fontSize: fontResizerState["lowFont"] }}
        >
          {label}
        </p>
        <input placeholder="Author search" className="filtering-input w-100" value={userentry.author?userentry.author:""} onChange={(e)=>setuservalues(e.target.value)}/>
        {newapidata &&
        <div style={{
            display:"flex",flexDirection:"column",position:"relative",
            ackgroundColor:"#2BB24C",color:"black",paddingLeft:"7px",cursor:"pointer",
            boxShadow:"0px 0px 10px #646464"

            }}>          
           {newapidata["data"].filter(item=>{
                const searchval=userentry.author.toLowerCase();
                const name=item.name.toLowerCase()
                return searchval && name.startsWith(searchval) && name!==searchval
            })
            .map((d)=>{
                console.log("data in map",d)
                return(
                    <div onClick={()=>setuservalues(d.name)}>
                        {d.name}
                    </div>
                )
            })
          } 
        </div>
        }
      </div>
    );
  };

  export default UserEntryView