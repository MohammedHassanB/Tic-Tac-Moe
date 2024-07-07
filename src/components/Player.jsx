import { useState } from "react";

export default function Player({InitialName,symbol,isActive,onSetName})
{
const [name,setName]=useState(InitialName);
const [isEditing,SetIsEditing]=useState(false);
function handelEditClick()
{
     SetIsEditing((editing)=>!editing);
     if(isEditing)
      {
        onSetName(symbol,name)
      }
}

function handelChange(e)
{
setName(e.target.value);
}
let playerName= <span className="player-name">{name}</span>;
if(isEditing)
{
  playerName=<input type="text" required value={name} onChange={handelChange}/>;
}
  return(
    <li className={isActive?'active':''}>
    <span className="player">
    {playerName}
    <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handelEditClick}>{isEditing?'Save':'Edit'}</button>
  </li>
  );
}