import React,{ useEffect, useRef, useState } from "react";
import { fabric } from 'fabric';
import upload_img from '../assets/certificate_img/upload_img/web.png';

import Navbar from './Components/Navbar_certificate.jsx';
import api from '../utils/api.js';
import axios from 'axios';
// side navbar

// side navbar icons imports
import { BsGrid1X2 } from "react-icons/bs";
import { FaShapes } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { MdKeyboardArrowLeft, MdOutlineCloudUpload } from "react-icons/md";
import { TfiText } from "react-icons/tfi";
import { RxTransparencyGrid } from "react-icons/rx";
import { FaRegFolderClosed } from "react-icons/fa6";
import { jsPDF } from 'jspdf';

const Certificate_custome = () =>{
    const canvasref = useRef(null);
    const [selectedFilebimg, setSelectedFilebimg] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [bimg_submit_status,setBimg_submit_status] = useState(false);
    const [canvas,setCanvas] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [show,setShow] = useState({
        status:true,
        name:''
    });
    const [bimages,setBImages] = useState([]);
    const [cimage,setCImages] = useState([]);

    const [orientation,setOrientation] = useState('landscape');
    const [state,setState] = useState('');
    const [canvabackground,setBackground] = useState('white');
    const [background_img,setBackgroundimg] = useState('');
    const font_family =  ["Pacifico", "VT323", "Quicksand", "Inconsolata", "Arial", "Verdana", "Helvetica", "Garamond", "Courier New","Roboto"];

    const seElements = (type,name)=>{
        setState(type);
        setShow({
            status:false,
            name
        });
    }

    useEffect (() =>{


        // background image axios
        getbackground_images();       

        // canvas set images
        api.post('/certificate/cimg')
        .then(response =>{
            console.log("canvas images");
            console.log(response.data.status);
            if (response.data.status===true) {
                setCImages(response.data.data);
            }
        })
        .catch(error =>{
            console.log("axios error canva images");
        })

        const canvasInstance = new fabric.Canvas(canvasref.current);
        canvasInstance.setBackgroundColor('white', canvasInstance.renderAll.bind(canvasInstance));

        setCanvas(canvasInstance);


        return () =>{
            canvasInstance.dispose();
        }

      

    },[]);

    // get background images function
    const getbackground_images  = ()=>{
        api.post('/certificate/bimg')
        .then(response =>{
            console.log("background images");
            console.log(response.data);
            if (response.data.status===true) {
                setBImages(response.data.data);
            }
        })
        .catch(error =>{
            console.log("error axios images");
        })
    }
    const addRectangle = ()=>{
        const rect = new fabric.Rect({
            left:Math.random()*400,
            top:Math.random()*400,
            fill:'red',
            width:100,
            height:100
        });

        canvas.add(rect);
    }

    const addCircle = ()=>{
        const circle = new fabric.Circle({
            left:Math.random()*400,
            top:Math.random()*400,
            radius:50,
            fill:'blue',
        });

        canvas.add(circle);
    }

    const addtext = () =>{
        const text = new fabric.IText("hello strategy",{
            left:100,
            top:300,
            fill:'black',
            fontSize:30,
            evented: true, 
            selectable: true, 
            editable: true,
        });

        canvas.add(text);
    }

    const addTriangle = () =>{
        const triangle = new fabric.Triangle({
            width:20,
            height:30,
            fill:'red',
            left:20,
            top:30,
        });

        canvas.add(triangle);
    }

    const addImg = (e, url, canvi) => {
        e.preventDefault();
        let url_path = `http://localhost:8000/upload_img/image_canva/`+url;
        new fabric.Image.fromURL(url_path, img => {
          img.scale(0.20);
            // var my_image = img.set({left:0,top:20,width:400,height:400});
          canvi.add(img);
          canvi.renderAll();
          setImgURL('');
        },{ crossOrigin: 'Anonymous' });
    }



   

   
    const changebackgroundcolor = (value)=>{
        console.log("backround color is :\t"+value);
       
        setBackground(value);
        canvas.setBackgroundColor(canvabackground, canvas.renderAll.bind(canvas));
    }

    const changeBackgroundImage = (url) => {
        console.log("background image url is ", url);
        let url_path = `http://localhost:8000/upload_img/background_img/${url}`;
        console.log(url_path);

        fabric.Image.fromURL(url_path, (img) => {
            img.set({
                crossOrigin: 'Anonymous', // Ensure CORS is handled
            });

            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height,
            });
        }, { crossOrigin: 'Anonymous' }); // Ensure CORS is handled when loading the image
    };

    // change background image
    const removeBackgroundImage = () =>{
        fabric.Image.fromURL(null, (img) => {
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height,
          });
        });
    }

    const deletecurrentobject = (e)=>{
        // alert('hi');
        var selection = canvas.getActiveObject();
        canvas.remove(selection);
        canvas.discardActiveObject();
        canvas.requestRenderAll();
    }

    const changefontproperty = (type,val)=>{
        if (type==="fontweight") {
            console.log("font weight value is:\t"+val);
            canvas.getActiveObject().set('fontWeight',val);
        }
        else if(type==="zindex"){
            console.log("zindex value is :\t"+val);
            canvas.getActiveObject().set('Zindex',val);
        }
        else if(type==='fontsize'){
            console.log("text font size value is:\t"+val);
            canvas.getActiveObject().set("fontSize",val);
        }
        else if(type==='fontcolor'){
            console.log("text font color value is:\t"+val);
            canvas.getActiveObject().set("fill", val);  
        }
        else if(type==='fontfamily'){
            console.log("text font family value is:\t"+val);
            canvas.getActiveObject().set("fontFamily", val);  
            canvas.requestRenderAll();
        }


        canvas.renderAll();
    }

    const downloadimge = ()=>{
        let a = document.createElement('a');
        let dt = canvas.toDataURL({format:'png', quality:1,});
        a.href = dt;
        a.download = 'canvas.png';
        a.click();

    }


    const downloadpdf = ()=>{
        const dataURL = canvas.toDataURL({
            format: 'png',
            multiplier: 2 // Increase the resolution if needed
        });
        // Create a new jsPDF instance
        const pdf = new jsPDF(orientation, 'px', [canvas.width, canvas.height]);

        // Add the image to the PDF
        pdf.addImage(dataURL, 'PNG', 0, 0, canvas.width, canvas.height);

        // Save the PDF
        pdf.save('canvas.pdf');
    }
    



    const handleFileget = (event) => {
        setSelectedFilebimg(event.target.files[0]);
        setBimg_submit_status(true);
        setUploadStatus('');
    };

    const insert_bimg = () => {
        // alert('hi');
        if (!selectedFilebimg) {
            console.log("image not found");
            setUploadStatus('please select image');
            alert('image not found');
            return;
        }else if(selectedFilebimg){
            const formData = new FormData();
            formData.append("image", selectedFilebimg);
            api.post('/certificate/upload_img/background_img',formData,{ 
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response =>{
                // console.log("canvas images");
                // console.log(response.data.status);
                if (response.data.status===true) {
                    getbackground_images();
                    console.log("background image insertion success");
                    document.getElementById('file_input').value='';

                }

            })
            .catch(error =>{
                console.log("axios error canva background images insertion");
            })
        }
    }

    return(
        <>
            <div className='min-w-screen h-screen '>
                <Navbar />
                <div className='flex h-[91%] w-100 bg-black '>
                    <div className='flex flex-col w-[7%] bg-[#181918] z-50 h-full text-gray-500 mt-14 pt-2'>
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
                    <div className="flex w-[94%] h-full flex-row mt-14 pt-1">
                        <div className={`${show.status?'p-0 -left-[350px]':'px-8 left-[74px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
                            <div onClick={()=>setShow({name:'',status:true})} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full '>< MdKeyboardArrowLeft /></div>
                            {state==='design'?( 
                                <div className='grid grid-cols-2 gap-2'>
                                    <h1>Template designs</h1>
                                </div>
                            ):state ==='shape' ? (
                                <div className='grid grid-cols-3 gap-2'>
                                    <div  onClick={addRectangle} className='h-[99px] bg-[#3c3e3d] cursor-pointer '></div>
                                    <div  onClick={addCircle} className='h-[90px] bg-[#3c3e3d] cursor-pointer rounded-full'></div>
                                    <div  onClick={addTriangle} className='h-[90px] bg-[#3c3e3d] cursor-pointer' style={{clipPath:'polygon(50% 0,100% 100%,0 100%)'}}></div>
                                    {/* oval css */}
                                    <div  className='h-[60px] w-100px bg-[#3c3e3d] cursor-pointer rounded-full'></div>
                                    {/* Parallelogram  */}
                                    <div className="h-[60px] w-[100px] transform bg-[#3c3e3d] skew-x-12 "></div>
                                    {/* rectangle */}
                                    <div className="w-[100px] h-[60px] bg-[#3c3e3d] ml-3"></div>
                                    {/*  */}
                                    
                                </div>
                            ):state ==='image'?(
                                <h2>Upload images</h2>
                            ):state==='text'?(
                                <div className='grid grid-cols-1 gap-2'>
                                    <div  className='bg-[#3c3e3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                                        <h2 onClick={addtext} >Add a Text</h2>
                                    </div>
                                </div>
                            ):state==='project'?(
                                <h2>Project template</h2>
                            ):state==='initImage'?(
                                 <div className='h-full overflow-x-auto flex justify-start items-start '>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {console.log("canvas images 1234")}
                                        {console.log(cimage)}
                                        {
                                            cimage.map((img,i)=>
                                            <div onClick={(e)=>addImg(e,img.filename,canvas)} className='w-full h-[100px] overflow-hidden rounded-sm cursor-pointer '>
                                                <img src={`http://localhost:8000/upload_img/image_canva/${img.filename}`} alt="" key={i} className='h-full w-full object-fit '/>
                                            </div>
                                            )
                                        }
                                        {/* <h2>Backround image in canvas</h2> */}
                                    </div>
                                </div>
                            ):state==='background' &&(
                                <>
                                <div className='w-full h-max flex flex-col justify-center items-center  mb-3'>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" onChange={handleFileget} id="file_input" type="file" />
                                    <button className="bg-purple-700 w-full h-[30px] mt-2 text-white rounded-sm " onClick={insert_bimg} disabled={!bimg_submit_status}>Upload Image</button>
                                    {/* <p>{uploadStatus}</p> */}
                                </div>
                                <div className='h-full overflow-x-auto flex justify-start items-start '>
                                    <div className='grid grid-cols-3 gap-2'>
                                        {
                                            bimages.map((img,i)=>
                                            
                                            <div onClick={()=>changeBackgroundImage(img.filename)} className='w-full h-[100px] overflow-hidden rounded-sm cursor-pointer '>
                                                <img src={`http://localhost:8000/upload_img/background_img/${img.filename}`} key={i} alt="" className='h-full w-full object-fit '/>
                                            </div>
                                            )
                                        }
                                        {/* <h2>Backround image in canvas</h2> */}
                                    </div>
                                </div>
                                </>
                            )}
                        </div>
                        <div className="h-full w-full flex flex-row ">
                            <div className="flex justify-center items-center relative h-full w-[80%] overflow-hidden bg-black">
                                <canvas ref={canvasref} width={800} height={500} />
                            </div>
                            <div className="h-full w-[20%] flex justify-start items-center  bg-[#252627] ">
                                <div className="h-full overflow-x-auto flex justify-start items-start w-[100%] ">
                                    <div className="grid grid-cols-1 gap-2 py-4">
                                        <h2 className="flex w-[100%] h-max justify-center text-white mb-3">Canva Properties</h2>
                                        <div className="flex flex-row justify-between items-center p-2 text-white">
                                            <span >Background Color</span>
                                            <input type="color" name="color" id="color"  onChange={(e)=>changebackgroundcolor(e.target.value)}  height={200} width={200}/>
                                        </div>
                                        <div className="flex flex-row w-[100%] p-2 mb-3">
                                            <button className="text-white bg-[#181918] w-full p-2 rounded-md" onClick={deletecurrentobject}> Remove object</button>
                                        </div>

                                        <div className="flex flex-row w-[100%] p-2 mb-3">
                                            <button className="text-white bg-[#181918] w-full p-2 rounded-md" onClick={removeBackgroundImage}> Remove BackgroundIMage</button>
                                        </div>

                                        <h2 className="flex w-[100%] h-max justify-center text-white mb-3">Font Properties</h2>

                                        <div className="flex flex-row w-[100%] p-2 mb-2">
                                            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Font Size"  min={12} max={60} onChange={(e)=>changefontproperty('fontsize',e.target.value)}/>
                                        </div>
                                        <div className="flex flex-row w-[100%] p-2 mb-2">
                                            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="ZIndex" onChange={(e)=>changefontproperty('zindex',e.target.value)} />
                                        </div>
                                        <div className="flex flex-row justify-between items-center p-2 text-white">
                                            <span >Font Color</span>
                                            <input type="color" name="color" id="color"  onChange={(e)=>changefontproperty('fontcolor',e.target.value)}  height={200} width={200}/>
                                        </div>
                                        <div className="flex flex-row w-[100%] p-2 mb-2">
                                            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " onChange={(e)=>changefontproperty('fontweight',e.target.value)} min={100} max={1000} placeholder="Font Weight" />
                                        </div>

                                        <div className="flex flex-row w-[100%] p-2 mb-2">
                                            <form className="w-[100%] mx-auto">
                                                <select name="" id="fontfamily" onChange={(e)=>changefontproperty('fontfamily',e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <option selected>Choose Font Family</option>
                                                    {
                                                    font_family.map((item,index)=>
                                                        <option value={item}>{item}</option>
                                                    )
                                                }
                                                </select>
                                            </form>
                                        </div>

                                        <h2 className="flex w-[100%] h-max justify-center text-white mb-3">Download  Properties</h2>

                                        <div className="flex flex-row p-2 mb-2 justify-between items-center ">
                                            {console.log(orientation==='landscape')}
                                            <button className={`text-white ${orientation==='landscape'?'bg-[#181918] p-2 rounded rounded-o`':'transparent'} w-[45%] `} onClick={(e)=>{setOrientation('landscape')}}>Landscape</button>
                                            <button className={`text-white ${orientation==='portrait'?'bg-[#181918] p-2 rounded rounded-o`':'transparent'} w-[45%] `} onClick={(e)=>{setOrientation('portrait')}}>Portrait</button>

                                        </div>

                                        <div className="flex flex-row p-2 mb-2 justify-center items-center">
                                            <a href="#" className="text-white bg-[#181918] w-full p-2 rounded-md" onClick={downloadimge}>SaveImage</a>
                                        </div>

                                        <div className="flex flex-row p-2 mb-2 justify-center items-center">
                                            <button className="text-white bg-[#181918] w-full p-2 rounded-md" onClick={downloadpdf}>SavePdf</button>
                                        </div>
                                    </div>
                               </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex flex-row justify-between items-center w-full">
                    <button onClick={addRectangle}>AddRectangle</button>
                    <button onClick={addCircle}>add Circle</button>
                    <button onClick={addtext}>AddText</button>
                    <button onClick={addTriangle}>AddTriangle</button>
                    <button onClick={(e)=>addImg(e,upload_img,canvas)}>AddImage</button>
                    <input type="text" name="text" id="text" onChange={(e)=>textsizechange(e.target.value)} placeholder="FOnt Size"/>
                    <input type="text" name="zindex" id="zindex" onChange={(e)=>changeZindex(e.target.value)} placeholder="Enter Z-Index" />
                    <input type="color" name="color" id="color" onChange={(e)=>changebackgroundcolor(e.target.value)}  height={200} width={200}/>

                    
                </div> */}
               

                {/* <canvas ref={canvasref} width={800} height={600} /> */}
            </div>
        </>
    );

}


export default Certificate_custome;