import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import './display.css'

export const Display = () => {

    const { register, handleSubmit } = useForm()
    const [selectedFile,  setSelectedFile] = useState('')
    const [newMedia, setNewMedia] = useState('')
    const [posts, setPosts] = useState([])
    const [displayMedia, setDisplayMedia] = useState(null)

    const onSubmit = (data) => {
        console.log(data)
        setPosts([...posts, {
            id: posts.length,
            fileURL: newMedia,
            type: data.post[0].type
        }])
    }
    //console.log(posts);
    const onChange = e => {
        setNewMedia(URL.createObjectURL(e.target.files[0]))
        setSelectedFile(e.target.files[0].name)
    }

    const largeDisplay = (checkMedia) => {
        if(checkMedia === null){
            return(<p>Select a video to display</p>)
        } else{
            if(posts[0].type === 'video/mp4'){
                return(
                    <video className='lg-post' >
                        <source src={posts[0].fileURL} type="video/mp4"></source>
                    </video>
                )
            } else{
                return(<img src={checkMedia} className='lg-post' alt=''></img>)
            }
            
        }
    }

    const samllDisplay = (checkMedia) => {
        return(
            <div className="grid-item">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="upload-btn-wrapper">
                        <button className="btn">Select from device</button>
                        <input {...register('post')} onChange={onChange} type="file" name="post" />
                    </div>
                    <br></br>
                    <button type='submit' className='submitbtn'>upload</button>
                    <br></br>
                    <p>{selectedFile}</p>
                </form>
            </div>
        )
        // if(posts.length === 0){
        //     return(
        //         <div className="grid-item">
        //             <form onSubmit={handleSubmit(onSubmit)}>
        //                 <div className="upload-btn-wrapper">
        //                     <button className="btn">Select from device</button>
        //                     <input {...register('post')} onChange={onChange} type="file" name="post" />
        //                 </div>
        //                 <br></br>
        //                 <button type='submit' className='submitbtn'>upload</button>
        //                 <br></br>
        //                 <p>{selectedFile}</p>
        //             </form>
        //         </div>
        //     )
        // } else if(checkMedia.type === 'video/mp4'){
        //     return(
        //         <div className='grid-item' key={checkMedia.id} onClick={() => setDisplayMedia(checkMedia.fileURL)}>
        //             <video className='small-post'>
        //                 <source src={checkMedia.fileURL} type="video/mp4"></source>
        //             </video>
        //         </div>
        //     )
        // } else{
        //     return(
        //         <div className='grid-item' key={checkMedia.id} onClick={() => setDisplayMedia(checkMedia.fileURL)}>
        //             <img src={checkMedia.fileURL} className='small-post' alt=''></img>
        //         </div>
        //     )
        // }
    }

    return(
        <div className='display'>
            <div className='flex-container'>
                <div className='view-item'>
                    {largeDisplay(displayMedia)}
                </div>
                <div className='selection'>
                    <div className='select-type'>
                        <p>Select Type</p>
                        <select>
                            <option value=''>TikTok Duet</option>
                            <option value='Option 2'>Option 2</option>
                            <option value='Option 3'>Option 3</option>
                        </select>
                    </div>
                    <div className='select-item'>
                        <p>Select A Video To Display</p>
                        <div className="grid-container">
                            {
                                samllDisplay(posts[0])
                            }
                            { 
                                posts.map( item => (
                                    <div className='grid-item' key={item.id} onClick={() => setDisplayMedia(item.fileURL)}>
                                        <img src={item.fileURL} className='small-post' alt=''></img>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display