import React from "react";
import "./ErrorBoundary.css";

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean,
    error : Error | null;
    info: object;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props : ErrorBoundaryProps){
        super(props);
        this.state= {
            hasError : false,
            error: new Error(),
            info : {componentStack : ""},
        };
    }
    static getDerivedStateFromError = (error: Error) => {
        return {hasError : true}
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("error", error);
        this.setState({hasError : true, error, info : errorInfo})
    }
    render(){
        if (this.state.hasError){
            return (
                <div className="error-container">
                    <h1 style={{padding: "2rem"}} role="alert" aria-live="assertive">
                        Something has gone wrong. Please reload your screen
                    </h1>
                </div>
            );
        }
        return this.props.children;

    }
}
export default ErrorBoundary;