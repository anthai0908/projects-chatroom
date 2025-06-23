import React , {PropsWithChildren, RefObject, ReactNode, FC} from "react";
import ReactDOM from 'react-dom';
import {cx, css} from "@emotion/css";

interface BaseProps {
    className?: string,
    [key: string] : any;
}

export const Button = React.forwardRef<HTMLSpanElement, PropsWithChildren<{active: boolean, reversed: boolean;} &BaseProps>>(
    (
        {
            className,
            active, 
            reversed,
            ...props
        },
        ref:
            | RefObject<HTMLSpanElement | null>
            | ((instance: HTMLSpanElement | null) => void)
            | null   
    ) => {
        return (
            <span
            {...props}
            ref = {ref}
            className = {cx(
                className,
                css`
                cursor: pointer;
                color: ${reversed? active ? "white" : "#aaa"
                                  : active ? "black" : "#aaa"};`
            )}
            />
        )
    }
);

export const EditorValue = React.forwardRef<HTMLDivElement, PropsWithChildren<{ value: any } & BaseProps>>((
    {
        className,
        value,
        ...props
    }, ref : 
            |RefObject<HTMLDivElement | null>
            |((instance: HTMLDivElement | null)=> void)
            |null
) =>{
    const textLines = value.document.nodes.map((node : any) => {
        return node.text;
    }).toArray().join("\n");
    return (
        <div
        ref = {ref}
        {...props}
        className = {css(
            className,
            css`
            margin: 30px -20px 0;
            `
        )}
        >
        <div
        className = {css`
        font-size: 14px;
        padding: 5px 20px;
        color: #404040;
        border-top : 2px solid #eeeeee;
        background: #f8f8f8;
        `}
        >
            Slae's value as text
        </div>
        <div
            className = {css`
                color: #404040;
                font: 12px monospace;
                white-space: pre-wrap;
                padding: 10px 20px;
                div{
                margin: 0 0 0 0.5em;}
                `}
        >
            {textLines}
            </div>
        </div>
        
    )
});

export const Instruction = React.forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>((
    {className, ...props} : PropsWithChildren<BaseProps>, 
    ref:
        |RefObject<HTMLDivElement | null>
        |((instance: HTMLDivElement | null) =>void)
        |null) =>{
            return (
                <div
                {...props}
                ref = {ref}
                className = {cx(
                    className,
                    css`
                    white-space: pre-wrap;
                    margin: 0 -20px 10px;
                    padding: 10px 20px;
                    font-size: 14px;
                    background: #f8f8e8;
                    `
                )}
                />
            )
        });
export const Menu = React.forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>((
    {
        className,
        ...props
    } : PropsWithChildren<BaseProps>
, ref:
|RefObject<HTMLDivElement |null>
|((instance : HTMLDivElement| null) => void)
|null) =>{
    return(
        <div
        {...props}
        ref = {ref}
        className={cx(
            className,
            css`
            & > * {
                display: inline-block;
            }
            & > * {
                margin-left: 15px;
            }
            `
        )}/>
    )
});

export const Portal : FC<{children: ReactNode}> = ({children}) => {
    return(ReactDOM.createPortal(children, document.body));
}

export const Toolbar = React.forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>((
    {
        className,
        ...props
    } : PropsWithChildren<BaseProps>, ref :
    |RefObject<HTMLDivElement | null>
    |((instance: HTMLDivElement)=>void)
    |null
) =>{
    return (
        <Menu {...props}
        ref = {ref}
        className = {cx(
            className,
            css`
            position: relative;
            padding: 1px 18px 17px;
            margin: 0 -20px;
            border-bottom: 2px solid #eeee;
            margin-bottom: 20px;`
        )}
        />
    )
});