import React from 'react';
import {BsTrash} from 'react-icons/bs'   
import ElementEdges from './ElementEdges.jsx'


const Createcomponent = ({info,current_component,removeComponent}) =>{

    const randValue = Math.floor(Math.random()*100);
    let html='';
    // console.log("component element");
    // console.log(info);
    // console.log(current_component)

    if (info.name==='main_frame') {
        html=<div onClick={()=>info.setCurrentComponent(info)} className='hover:border-[2px] hover:border-indigo-500 shadow-md' style={{width:info.width+'px',height:info.height+'px',background:info.color,zIndex:info.z_index}}>
            {
                info.image && <img src={info.image} className='w-full h-full ' alt="image" />
            }
        </div>
    }

    if (info.name === 'shape' && info.shapename === 'rect') {
        // console.log("rectangle shape is selected ");
        html=<div id={randValue} onClick={()=>info.setCurrentComponent(info)} 
        className='absolute group hover:border-[2px] hover:border-indigo-500' 
        style={{
            width:info.width+'px',
            height:info.height+'px',
            background:info.color,
            opacity:info.opacity,
            left:info.left+'px',
            right:info.right+'px',
            top:info.top+'px',
            zIndex:info.z_index,
            transform:info.rotate?`rotate(${info.rotate}deg)`:`rotate(0deg)`,
        }}>
            <ElementEdges id={randValue } info={info} exId="" />
            {
                current_component.id===info.id && <div  onClick={()=>removeComponent(info.id)}
                className='py-2 px-3 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-sm'>
                    <BsTrash />
                </div>
            }
        </div>
    }

    if (info.name === 'shape' && info.shapename === 'circle') {
        // console.log("rectangle shape is selected ");
        html=<div id={randValue} onClick={()=>info.setCurrentComponent(info)} 
        className='absolute group hover:border-[2px] hover:border-indigo-500' 
        style={{
            left:info.left+'px',
            top:info.top+'px',
            zIndex:info.z_index,
            transform:info.rotate?`rotate(${info.rotate}deg)`:`rotate(0deg)`,
        }}>
            <ElementEdges id={randValue} info={info} exId={`${randValue}c`} />
            <div id={`${randValue}c`} className='rounded-full' style={{
                width:info.width+'px',
                height:info.width+'px',
                background:info.color,
                opacity:info.opacity,
            }}></div>
            {
                current_component.id===info.id && <div  onClick={()=>removeComponent(info.id)}
                className='py-2 px-3 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-sm'>
                    <BsTrash />
                </div>
            }
        </div>
    }

    if (info.name === 'shape' && info.shapename === 'triangle') {
        // console.log("rectangle shape is selected ");
        html=<div id={randValue} onClick={()=>info.setCurrentComponent(info)} 
        className='absolute group hover:border-[2px] hover:border-indigo-500' 
        style={{
            left:info.left+'px',
            top:info.top+'px',
            zIndex:info.z_index,
            transform:info.rotate?`rotate(${info.rotate}deg)`:`rotate(0deg)`,
        }}>
            <ElementEdges id={randValue} info={info} exId={`${randValue}t`} />
            <div id={`${randValue}t`}  style={{
                width:info.width+'px',
                height:info.height+'px',
                background:info.color,
                opacity:info.opacity,
                clipPath:'polygon(50% 0,100% 100%,0 100%)',
            }}></div>
            {
                current_component.id===info.id && <div  onClick={()=>removeComponent(info.id)}
                className='py-2 px-3 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-sm'>
                    <BsTrash />
                </div>
            }
        </div>
    }

    if (info.name === 'text' ) {
        html=<div id={randValue} onClick={()=>info.setCurrentComponent(info)} 
        className='absolute group hover:border-[2px] hover:border-indigo-500' 
        style={{
            left:info.left+'px',
            top:info.top+'px',
            zIndex:info.z_index,
            transform:info.rotate?`rotate(${info.rotate}deg)`:`rotate(0deg)`,
            padding:info.padding +'px',
            color:info.color,
            opacity:info.opacity,
        }}>
            <ElementEdges id={randValue} info={info} exId="" />
            <h2  style={{fontSize:info.font +'px',fontWeight:info.weight}} className='w-full h-full'>{info.title}</h2>
            {
                current_component.id===info.id && <div  onClick={()=>removeComponent(info.id)}
                className='py-2 px-3 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-sm'>
                    <BsTrash />
                </div>
            }
        </div>
    }

    if (info.name=== 'image') {
        html=<div id={randValue} onClick={()=>info.setCurrentComponent(info)} 
        className='absolute group hover:border-[2px] hover:border-indigo-500' 
        style={{
            left:info.left+'px',
            top:info.top+'px',
            zIndex:info.z_index,
            transform:info.rotate?`rotate(${info.rotate}deg)`:`rotate(0deg)`,
            opacity:info.opacity,
        }}>
            <ElementEdges id={randValue} info={info} exId={`${randValue}img`} />
            <div id={`${randValue}img`} style={{
                width:info.width+'px',
                height:info.height+'px',
                borderRadius:`${info.radius}%`
            }}>
                <img src={info.image} className='w-full h-full'  alt="Image" />
            </div>
            {
                current_component.id===info.id && <div  onClick={()=>removeComponent(info.id)}
                className='py-2 px-3 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-sm'>
                    <BsTrash />
                </div>
            }
        </div>
    }
    // console.log(html);
    // console.log("selected rectangle");
    return html;

}

export default Createcomponent;