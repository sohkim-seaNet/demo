<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/animation/animation2.css">
</head>
<body>
    <%@ include file="/WEB-INF/views/inc/header.jsp" %>
    <div class="container mt-5">

        <div class="controls">
            <input type="number" id="valueInput" min="0" max="800" placeholder="0 ~ 800">
            <button id="updateButton">적용</button>
        </div>

        <svg id="_레이어_2" data-name="레이어 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 598.86 280.07">
            <g id="THRUSTER">
                <g>
                    <g>
                        <text class="cls-8" transform="translate(0 261.25)"><tspan x="0" y="0">0000</tspan></text>
                        <text class="cls-8" transform="translate(534.34 261.25)"><tspan x="0" y="0">800</tspan></text>
                        <text class="cls-8" transform="translate(274.63 26.55)"><tspan x="0" y="0">400</tspan></text>
                        <text class="cls-8" transform="translate(96.06 86.05)"><tspan x="0" y="0">200</tspan></text>
                        <text class="cls-8" transform="translate(453.83 86.05)"><tspan x="0" y="0">600</tspan></text>
                    </g>
                    <g>
                        <line class="cls-1" x1="96.73" y1="162.2" x2="237.99" y2="228.34"/>
                        <circle class="cls-5" cx="299.14" cy="261.25" r="7.8"/>
                        <path class="cls-2" d="m299.14,191.82c38.34,0,69.43,31.08,69.43,69.43h157.88c0-125.54-101.77-227.3-227.3-227.3s-227.3,101.77-227.3,227.3h157.88c0-38.34,31.08-69.43,69.43-69.43Z"/>
                        <line class="cls-3" x1="71.83" y1="259.25" x2="229.71" y2="259.25"/>
                        <line class="cls-3" x1="368.56" y1="259.25" x2="526.44" y2="259.25"/>
                        <g id="needle">
                            <g>
                                <path class="cls-7" d="m299.14,263.07c-3.08,0-5.95-1.33-8.08-3.74-2.36-2.67-3.46-6.31-3-9.97l3.88-31.25,5.14-163.42c.04-1.24.92-2.21,2.01-2.21s1.97.97,2.01,2.21l5.14,163.43,3.98,31.21c.47,3.67-.62,7.31-2.99,10-2.13,2.42-5,3.75-8.09,3.75Z"/>
                                <path class="cls-7" d="m299.09,54.65s0,.06.01.1l5.14,163.33v.19s.03.19.03.19l3.96,31.11c.39,3.1-.52,6.17-2.5,8.42-1.74,1.98-4.09,3.07-6.59,3.07s-4.84-1.09-6.58-3.06c-1.98-2.25-2.9-5.31-2.52-8.4l3.87-31.16.02-.18v-.18s5.14-163.33,5.14-163.33c0-.04,0-.07.01-.1m0-4.17c-2.16,0-3.94,1.83-4.01,4.15l-5.14,163.33-3.87,31.16c-1.05,8.45,5.1,15.95,13.07,15.95s14.14-7.54,13.06-16l-3.96-31.11-5.14-163.33c-.07-2.31-1.85-4.15-4.01-4.15h0Z"/>
                            </g>
                            <circle class="cls-4" cx="299.14" cy="261.73" r="7.32"/>
                        </g>
                        <rect class="cls-6" x="12.23" y="250.07" width="574.39" height="30"/>
                    </g>
                </g>
            </g>
        </svg>
    </div>
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/animation/gaugeUtils.js"></script>
    <script src="/js/animation/animation2.js"></script>
</body>
</html>