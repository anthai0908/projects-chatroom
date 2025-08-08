import React, {FC, useEffect, useState} from "react";

interface ThreadTitleProps {
    title?: string,
    readOnly: boolean,
    sendOutTitle: (title: string)=> void;
}

const ThreadTitle : FC <ThreadTitleProps> = ({title, readOnly, sendOutTitle}) => {
    const [currentTitle, setCurrentTitle] = useState("");
    useEffect(()=>{
        setCurrentTitle(title || "");
        console.log("Current title is: ", currentTitle)
    }, [title]);

    const onChangeTitle = (e :React.ChangeEvent<HTMLInputElement>) =>{
        setCurrentTitle(e.target.value);
        sendOutTitle(e.target.value);
    };
    return (
        <div className="thread-title-container">
            <strong> Title</strong>
            <div className = "field">
                <input
                type = "text"
                value = {currentTitle}
                onChange = {onChangeTitle}
                readOnly = {readOnly}
                placeholder = "Title"></input>
            </div>
        </div>
    );
};
export default ThreadTitle;

