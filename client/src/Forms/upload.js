
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";
import axios from "axios";
import { useState } from "react";
import { URL } from "../cred";

export const Upload = (props) => {
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
            maxFiles={10}
            maxFileSize={5240000}
            label="Click here to upload files"
            url={URL + "/upload"}
            accept=".png,image/*,.pdf"
            footer={false}
           
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
        </>
    );
}
