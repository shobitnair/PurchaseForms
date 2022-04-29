
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import { useState } from "react";
import { URL } from "../cred";

export const Upload = () => {
    const [files, setFiles] = useState([]);
    const [imageSrc, setImageSrc] = useState(undefined);


    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
    };


    const onDelete = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };


    const handleSee = (imageSource) => {
        setImageSrc(imageSource);
    };

    
    return (
        <><Dropzone
            onChange={updateFiles}
            value={files}
            maxFileSize={5240000}
            label="Click here to upload files"
            uploadingMessage={"Uploading..."}
            url={URL + "/upload"}
        >
            {files.map((file) => (
                <FileItem
                    {...file}
                    key={file.id}
                    onDelete={onDelete}
                    onSee={handleSee}
                    resultOnTooltip
                    preview
                    info
                    hd />
            ))}
            <FullScreenPreview
                imgSource={imageSrc}
                openImage={imageSrc}
                onClose={(e) => handleSee(undefined)} />
        </Dropzone>
        <button onClick={()=>console.log(files)}>yoi</button>
        </>
    );
}
