<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/animation/animation1.css">
</head>
<body>
    <div class="container mt-5">

        <div class="gauge-container">
            <%-- 게이지 이미지 --%>
            <img src="/img/Deg_pitch.png" alt="게이지 배경" class="gauge-background">

            <%-- 바늘 이미지 --%>
            <img src="/img/bow.png" alt="게이지 바늘" class="gauge-needle">
        </div>

        <%-- [추가] 사용자 입력을 위한 UI --%>
        <div class="controller">
            <input type="number" id="angle-input" placeholder="각도 입력 (예: -40 ~ 40)">
            <button id="angle-submit-btn">적용</button>
        </div>

    </div>
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/animation/gaugeUtils.js"></script>
    <script src="/js/animation/animation1.js"></script>
</body>
</html>
