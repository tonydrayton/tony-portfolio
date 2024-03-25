const AnimatedShapeBackdrop = () => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen -z-10">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" viewBox="0 0 1440 560" style={{ width: "100%", height: "100vh" }}>
                <g mask="url(&quot;#SvgjsMask1023&quot;)" fill="none">
                    <rect width="1440" height="560" x="0" y="0" fill="rgba(56, 55, 55, 1)"></rect>
                    <path d="M209.63552847612775 191.59797501401152L181.80171075924042 322.54579190661445 312.7495276518434 350.3796096235018 340.5833453687307 219.43179273089885z" fill="rgba(129, 125, 125, 1)" className="triangle-float1"></path>
                    <path d="M79.08420508331238 228.3030059349996L258.59992433682885 177.01280043399487 143.19696195956826 61.609838056734276z" fill="rgba(129, 125, 125, 1)" className="triangle-float2"></path>
                    <path d="M951.7484499055112 315.75723481353754L945.7888978788926 230.5316702413544 860.5633333067094 236.49122226797294 866.522885333328 321.7167868401561z" fill="rgba(129, 125, 125, 1)" className="triangle-float1"></path>
                    <path d="M1133.935,295.429C1188.947,298.581,1245.887,278.009,1273.847,230.528C1302.152,182.461,1290.946,123.5,1263.91,74.708C1235.861,24.088,1191.773,-19.982,1133.935,-21.968C1073.091,-24.057,1013.95,10.373,987.52,65.217C963.629,114.793,989.749,169.508,1019.282,215.944C1046.03,258.001,1084.175,292.578,1133.935,295.429" fill="rgba(129, 125, 125, 1)" className="triangle-float1"></path>
                    <path d="M618.2841290085361 296.3452854618339L640.7034855001823 369.6756963472643 739.4894235825049 299.3814561670799z" fill="rgba(129, 125, 125, 1)" className="triangle-float2"></path>
                    <path d="M632.6370141519797 232.7784171561242L748.1115035642846 246.95690163410117 762.2899880422616 131.4824122217962 646.8154986299567 117.30392774381923z" fill="rgba(129, 125, 125, 1)" className="triangle-float3"></path>
                    <path d="M1022.2818112480305 445.7863268807145L1012.1299521860585 373.55209628524744 908.8545358238439 424.89700017593896z" fill="rgba(129, 125, 125, 1)" className="triangle-float3"></path>
                    <path d="M1049.202,560.875C1074.858,559.574,1099.422,548.215,1111.969,525.798C1124.251,503.854,1119.553,477.937,1108.173,455.512C1095.311,430.167,1077.527,404.464,1049.202,402.114C1017.425,399.477,986.286,416.417,970.436,444.084C954.669,471.606,956.61,506.481,974.345,532.778C990.317,556.461,1020.673,562.322,1049.202,560.875" fill="rgba(129, 125, 125, 1)" className="triangle-float1"></path>
                </g>
                <defs>
                    <mask id="SvgjsMask1023">
                        <rect width="1440" height="560" fill="#ffffff"></rect>
                    </mask>
                    <style>{`
                        @keyframes float1 {
                            0 % { transform: translate(0, 0) }
                    50%{transform: translate(-10px, 0)}
                        100%{transform: translate(0, 0)}
                }

                        .triangle-float1 {
                            animation: float1 5s infinite;
                }

                        @keyframes float2 {
                            0 % { transform: translate(0, 0) }
                    50%{transform: translate(-5px, -5px)}
                        100%{transform: translate(0, 0)}
                }

                        .triangle-float2 {
                            animation: float2 4s infinite;
                }

                        @keyframes float3 {
                            0 % { transform: translate(0, 0) }
                    50%{transform: translate(0, -10px)}
                        100%{transform: translate(0, 0)}
                }

                        .triangle-float3 {
                            animation: float3 6s infinite;
                }`}
                    </style>
                </defs>
            </svg>
        </div>
    )
}

export default AnimatedShapeBackdrop;