import { useEffect, useState } from 'react'; 
import Navbar from './Navbar_certificate';

// import SideNavbar from './Side_Navbar';

// side navbar icons imports
import { BsGrid1X2 } from "react-icons/bs";
import { FaShapes } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { MdKeyboardArrowLeft, MdOutlineCloudUpload } from "react-icons/md";
import { TfiText } from "react-icons/tfi";
import { RxTransparencyGrid } from "react-icons/rx";
import { FaRegFolderClosed } from "react-icons/fa6";
import upload_img from '../../assets/certificate_img/upload_img/web.png';


// template design certificate 
import TemplateDesign from './component_certificate/TemplateDesign.jsx';
import UploadImage from './component_certificate/UploadImage.jsx';
import Projects_template from './component_certificate/Projects_template.jsx';
import Createcomponent from './component_certificate/Createcomponent.jsx';
import Imageadd from './component_certificate/Imageadd.jsx';

const custome_certificate = () =>{

    const [state,setState] = useState('');
    const [current_component,setCurrentComponent] = useState('');
    const [show,setShow] = useState({
        status:true,
        name:''
    });
    const [bimage,setImage] = useState('');
    const [color,setColor] = useState('');
    const [rotate,setRotate] = useState(0);

    const [left,setLeft] = useState('');
    const [top,setTop] = useState('');
    const [width_s,setWidth] = useState('');
    const [height,setHeight] = useState('');

    
    const [font,setFont] = useState('');
    const [padding,setPadding] = useState('');
    const [weight,setWeight] = useState('');
    const [opacity,setOpacity] = useState('');
    const [zIndex,setZindex] = useState('');
    const [text,setText] = useState('');
    const [radius,setRadius] = useState('');


    const seElements = (type,name)=>{
        setState(type);
        setShow({
            status:false,
            name
        })
    }


    const moveElement = (id,currentinfo) =>{
       console.log("mouse move element");
       console.log(currentinfo);
        setCurrentComponent(currentinfo);

        let isMove = true;
        const current_div = document.getElementById(id);


        const mouseMove = ({movementX,movementY})=>{
            const getStyle = window.getComputedStyle(current_div);
           
            const left = parseInt(getStyle.left);
            const top = parseInt(getStyle.top);

            if (isMove) {
                current_div.style.left = `${left + movementX}px`;
                current_div.style.top = `${top + movementY}px`;

            }
        }

        const mouseUp = (e)=>{
            isMove=false;
            window.addEventListener('mousemove',mouseMove);
            window.addEventListener('mouseup',mouseUp);
            setLeft(parseInt(current_div.style.left));
            setTop(parseInt(current_div.style.top));
        }

        window.addEventListener('mousemove',mouseMove);
        window.addEventListener('mouseup',mouseUp);
    }

    const resizeElement = (id,currentinfo) =>{
       
        setCurrentComponent(currentinfo);
        console.log("mouse resize event called !!!");
        console.log(currentinfo);
        let isMove = true;
        const current_div = document.getElementById(id);


        const mouseMove = ({movementX,movementY})=>{
            const getStyle = window.getComputedStyle(current_div);
           
            const width = parseInt(getStyle.width);
            const height = parseInt(getStyle.height);

            if (isMove) {
                current_div.style.width = `${width + movementX}px`;
                current_div.style.height = `${height + movementY}px`;

            }
        }

        const mouseUp = (e)=>{
            isMove=false;
            window.addEventListener('mousemove',mouseMove);
            window.addEventListener('mouseup',mouseUp);
            setWidth(parseInt(current_div.style.width));
            setHeight(parseInt(current_div.style.height));
        }

        window.addEventListener('mousemove',mouseMove);
        window.addEventListener('mouseup',mouseUp);
    }

    const rotateElement = (id,currentinfo) =>{
        setCurrentComponent("");
        setCurrentComponent(currentinfo);
        console.log("rotate element");
        /*
        const target = document.getElementById(id);


        const mouseMove = ({ movementX, movementY })=>{
            const getstyle = window.getComputedStyle(target);
            const trans = getstyle.transform;
            console.log("transform");
            console.log(trans);
            const values = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round( Math.atan2(values[1],values[0]) * (180/Math.PI) )
            let deg = angle < 0 ? angle + 360 : angle
            if (movementX) {
                deg = deg + movementX
            }

            target.style.transform=`rotate(${deg}deg)`
           
        }

        const mouseUp = (e)=>{
            window.addEventListener('mousemove',mouseMove);
            window.addEventListener('mouseup',mouseUp);

            const getstyle = window.getComputedStyle(target);
            const trans = getstyle.transform;
            const values = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(values[1], values[0])*(180/Math.PI))
            let deg = angle < 0 ? angle + 360 : angle
            setRotate(deg)
        }

        window.addEventListener('mousemove',mouseMove);
        window.addEventListener('mouseup',mouseUp);
      */
    }

    // shape function
    const createShape = (type,shapename)=>{
        const style = {
            id:Components.length+1,
            name:type,
            shapename,
            left:10,
            top:10,
            right:10,
            opacity:1,
            width:200,
            height:150,
            rotate,
            z_index:2,
            color:'#3c3e3d',
            setCurrentComponent:(a)=>setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement,
        }

        setComponents([...Components,style])
    }

    const [Components,setComponents] = useState([{
        name:'main_frame',
        type:'rect',
        id:Math.floor((Math.random() * 100)+1),
        height:450,
        width:650,
        z_index:1,
        color:'white',
        image:'',
        setCurrentComponent:(a)=>setCurrentComponent(a)
    }]);

    const removeComponent = (id)=>{
        const temp = Components.filter(c=>c.id!==id);
        setCurrentComponent('');
        setComponents(temp);
    }

    const add_text = (type,shapename) =>{
        const temp = Components.filter(c=>c.id!==current_component.id);
       const style = {
            id:Components.length+1,
            name:type,
            shapename,
            left:10,
            top:10,
            right:10,
            opacity:1,
            rotate,
            z_index:2,
            padding:6,
            font:22,
            weight:400,
            title:'Add Text',
            color:'#3c3e3d',
            setCurrentComponent:(a)=>setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement,
        }

        setFont('');
        setWeight('');
        setCurrentComponent(style)
        setComponents([...Components,style])
    }

    const add_image = (img)=>{
        const style = {
            id:Components.length+1,
            name:'image',
            type:'image',
            left:10,
            top:10,
            right:10,
            opacity:1,
            width:200,
            height:150,
            rotate,
            z_index:2,
            image:img,
            radius:8,
            setCurrentComponent:(a)=>setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement,
        }
        setCurrentComponent(style)
        setComponents([...Components,style])
    }

    useEffect(()=>{
        console.log("use effect calloing");
        if (current_component) {
            const index = Components.findIndex(c=>c.id===current_component.id);
            const temp = Components.filter(c=>c.id!==current_component.id);
            

            if(current_component.name !=='text'){
                console.log(Components[index]);

                Components[index].width = width_s || current_component.width
                Components[index].height = height || current_component.height
                Components[index].rotate = rotate || current_component.rotate
            }

            if(current_component.name ==='text'){
                console.log(Components[index]);

                Components[index].font = font || current_component.font
                Components[index].weight = weight || current_component.weight
                Components[index].padding = padding || current_component.padding
                Components[index].title = text || current_component.title
            }

            if(current_component.name==='main_frame' && bimage){
               
                Components[index].image=bimage.upload_img || current_component.image
            }

            Components[index].color=color || current_component.color
            
            
            if (current_component!=='main_frame') {
                Components[index].left = left || current_component.left
                Components[index].top = top || current_component.top
                Components[index].opacity = opacity || current_component.opacity
                Components[index].z_index = zIndex || current_component.z_index
            }

            if(current_component==="image"){
                Components[index].radius = radius || current_component.radius
            }

            
            // setComponents
            setComponents([...temp,Components[index]]);

            setColor('');
            setHeight('');
            setWidth('');
            setTop('');
            setLeft('');
            setRotate(0);
            setOpacity('');
            setZindex('');
            console.log("use effect calling end");
        }

    },[color,bimage,left,top,height,width_s,opacity,zIndex,padding,weight,font,text,radius]);

    // remove background function 
    const removeBackground = () =>{
        console.log("remove background");
        const com = Components.find(c=>c.id===current_component.id);
        const temp = Components.filter(c=>c.id!==current_component.id);
        com.image='';
        setImage('');
        setComponents([...temp,com])
    }

    // set opacity function
    const opacityHandle = (e)=>{
        setOpacity(parseFloat(e.target.value))
    }

    return(
        <>
        <div className='min-w-screen h-screen '>
            <Navbar />
            <div className='flex h-full w-100 bg-black'>
                <div className='flex flex-col w-[88px]  bg-[#181918] z-50 h-full text-gray-500 '>
                    {/* <SideNavbar /> */}
                    <div onClick={() => seElements('design','design')} className={`${show.name==='design'?'bg-[#252627]':''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsGrid1X2/></span>
                        <span className='text-xs font-medium'>Design</span>
                    </div>

                    <div onClick={() => seElements('shape','shapes')} className={`${show.name==='shapes'?'bg-[#252627]':''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaShapes /></span>
                        <span className='text-xs font-medium'>Shapes</span>
                    </div>


                    <div onClick={() => seElements('image','uploadImage')} className={` ${show.name==='uploadImage'?'bg-[#252627]':''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><MdOutlineCloudUpload/></span>
                        <span className='text-xs font-medium'>Upload</span>
                    </div>


                    <div onClick={() => seElements('text','text')} className={` ${show.name==='text'?'bg-[#252627]':''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><TfiText/></span>
                        <span className='text-xs font-medium'>Text</span>
                    </div>
                    
                    <div onClick={() => seElements('project','projects')} className={` ${show.name==='projects'?'bg-[#252627]':''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaRegFolderClosed/></span>
                        <span className='text-xs font-medium'>Project</span>
                    </div>

                    <div onClick={() => seElements('initImage','images')} className={` ${show.name==='images'?'bg-[#252627]':''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><IoMdImages/></span>
                        <span className='text-xs font-medium'>Images</span>
                    </div>

                    <div onClick={() => seElements('background','background')} className={` ${show.name==='background'?'bg-[#252627]':''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><RxTransparencyGrid/></span>
                        <span className='text-xs font-medium px-1'>Background</span>
                    </div>
                </div>

                <div className='h-full w-[calc(100%-75px)]'>
                    <div className={`${show.status?'p-0 -left-[350px]':'px-8 left-[74px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
                        <div onClick={()=>setShow({name:'',status:true})} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full '>< MdKeyboardArrowLeft /></div>
                        {state==='design'?( 
                            <div className='grid grid-cols-2 gap-2'>
                               <TemplateDesign />
                            </div>
                        ):state ==='shape' ? (
                            <div className='grid grid-cols-3 gap-2'>
                                <div onClick={()=>createShape('shape','rect')} className='h-[99px] bg-[#3c3e3d] cursor-pointer '></div>
                                <div onClick={()=>createShape('shape','circle')} className='h-[90px] bg-[#3c3e3d] cursor-pointer rounded-full'></div>
                                <div onClick={()=>createShape('shape','triangle')} className='h-[90px] bg-[#3c3e3d] cursor-pointer' style={{clipPath:'polygon(50% 0,100% 100%,0 100%)'}}></div>
                                <div onClick={()=>createShape('shape','ovel')} className='h-[58px] bg-[#3c3e3d] cursor-pointer rounded-full'></div>
                                
                            </div>
                        ):state ==='image'?(
                            <UploadImage />
                        ):state==='text'?(
                            <div className='grid grid-cols-1 gap-2'>
                                <div onClick={()=>add_text('text','text')} className='bg-[#3c3e3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                                    <h2>Add a Text</h2>
                                </div>
                            </div>
                        ):state==='project'?(
                            <Projects_template />
                        ):state==='initImage'?(
                            <Imageadd add_image={add_image} />
                        ):state==='background' &&(
                            <div className='h-full overflow-x-auto flex justify-start items-start '>
                            <div className='grid grid-cols-3 gap-2'>
                                {
                                    [1,2,3,4,5,6,7,8,9,0,11,22,33,44,55,66].map((img,i)=>
                                    <div onClick={()=>setImage({upload_img})} className='w-full h-[100px] overflow-hidden rounded-sm cursor-pointer '>
                                        <img src={upload_img} alt="" className='h-full w-full object-fit '/>
                                    </div>
                                    )
                                }
                            </div>
                        </div>
                        )}
                    </div>
                    <div className='w-full h-full '>
                        <div className={`flex justify-center relative items-center h-full ${!current_component?'w-full':'w-[calc(100%-250px)] overflow-hidden'}`}>
                            <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
                                <div className='w-auto relative h-auto overflow-hidden' id='main_design'>
                                    {
                                        Components.map((c,i)=><Createcomponent key={i} info={c} current_component={current_component} removeComponent={removeComponent} />)
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            current_component && 
                            <div className='w-[200px] h-full text-gray-300 bg-[#252627] px-3 py-2 absolute right-0 top-[58px]'>
                                <div className='flex gap-3 flex-col items-start h-full px-3 justify-start'>
                                    <div className='flex gap-4 justify-start items-start'>
                                        <span>Color :</span>
                                        <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' htmlFor="Color" style={{background:`${current_component.color && current_component.color!='#fff'? current_component.color:'gray'}`}}></label>
                                        {/* <input type="color"  className='invisible' id="color" onChange={()=>setColor(e.target.value)}/> */}
                                        <input type="color" name="invisible" id="color" onChange={(e)=>setColor(e.target.value)} />
                                    </div>
                                    {
                                        (current_component.name==='main_frame' && bimage)&&
                                        <button className='w-full px-[2px] py-[3px] bg-slate-600 text-white rounded-sm text-sm' onClick={removeBackground}>Remove Background</button>
                                    }

                                    {
                                        (current_component.name!=='main_frame') && <div className='flex gap-3 flex-col'>
                                            <div className='flex gap-1 justify-start items-start '>
                                                <span className='text-md w-[70px] '>Opacity : </span>
                                                <input className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md ' onChange={opacityHandle} type="number" step={0.1} min={0.1} max={1} value={current_component.opacity} />
                                            </div>

                                            <div className='flex gap-1 justify-start items-start '>
                                                <span className='text-md w-[70px] '>Z-index : </span>
                                                <input className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md ' onChange={(e)=>setZindex(parseInt(e.target.value))} type="number" step={1} value={current_component.z_index} />
                                            </div>
                                        </div>
                                    }
                                    {
                                        (current_component.name==='text' ) && <>
                                        <div className='flex gap-1 justify-start items-start'>
                                            <span className='text-md w-[70px] '>Padding : </span>
                                            <input step={1} onChange={(e)=>setPadding(parseInt(e.target.value))} type="number" className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md ' value={current_component.padding}/>
                                        </div>

                                        <div className='flex gap-1 justify-start items-start'>
                                            <span className='text-md w-[70px] '>Font Size : </span>
                                            <input step={1} onChange={(e)=>setFont(parseInt(e.target.value))} type="number" className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md ' value={current_component.font}/>
                                        </div>


                                        <div className='flex gap-1 justify-start items-start'>
                                            <span className='text-md w-[70px] '>Font Weight : </span>
                                            <input step={100} max={900} min={100} onChange={(e)=>setWeight(parseInt(e.target.value))} type="number" className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md ' value={current_component.weight}/>
                                        </div>

                                        <div className='flex gap-2 flex-col justify-start items-start '>
                                            <input onChange={(e)=>setCurrentComponent({...current_component,title:e.target.value})} className='border border-gray-700 bg-transparent outline-none p-2 rounded-md' value={current_component.title} type="text" />
                                            <button onClick={()=>setText(current_component.title)} className='px-4 py-2 bg-purple-500 text-xs text-white rounded-sm'>Add</button>
                                        </div>
                                        </>
                                    }

                                    {
                                        (current_component.name==='image')&& <>
                                        
                                        <div className='flex gap-1 justify-start items-start '>
                                            <span className='text-md w-[70px] '>Radius : </span>
                                            <input className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md ' onChange={(e)=>setRadius(parseInt(e.target.value))} type="number" step={1} value={current_component.radius} />
                                        </div>
                                        </>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>

               
            </div>
        </div>
       
        
       
        </>
       
    );
}

export default custome_certificate;