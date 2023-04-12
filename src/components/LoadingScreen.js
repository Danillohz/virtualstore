import { useState} from "react";

function LoadingScreen(timeLoading) {

    const [loadingIsVisible, setLoadingIsVisible] = useState(true);

    setTimeout(() => {
        setLoadingIsVisible(false)
    }, timeLoading.value);

    return (
        <>
            {loadingIsVisible && (
                <div className="z-2 Loading-Screen">
                    <div className="position-absolute top-50 start-50 translate-middle  Glass-Container">
                        <div className="Glass"></div>
                        
                    </div>

                </div>
            )}
        </>
    )
}
export default LoadingScreen;