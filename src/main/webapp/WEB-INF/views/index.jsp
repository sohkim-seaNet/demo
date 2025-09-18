<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>메인</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <style>
        .main-content {
            height: calc(100vh - 56px);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .main-card {
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            padding: 2rem;
        }
    </style>
</head>
<body>
    <%@ include file="/WEB-INF/views/inc/header.jsp" %>

    <div class="main-content">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card main-card">
                        <div class="text-center">
                            <h1 class="mb-4">게시판 시스템</h1>
                            <p class="text-muted mb-4">간단한 게시판입니다</p>

                            <div class="d-grid gap-3">
                                <a href="/board/list" class="btn btn-primary btn-lg">게시판 보기</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
