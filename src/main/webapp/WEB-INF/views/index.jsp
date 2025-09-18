<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>메인</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <style>
        body {
            height: 100vh;
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
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card main-card">
                <div class="text-center">
                    <h1 class="mb-4">게시판 시스템</h1>
                    <p class="text-muted mb-4">간단한 게시판입니다</p>

                    <div class="d-grid gap-3">
                        <a href="/board/list" class="btn btn-primary btn-lg">게시판 보기</a>
                        <div class="d-flex gap-2">
                            <a href="/user/login" class="btn btn-outline-secondary flex-fill">로그인</a>
                            <a href="/user/signup" class="btn btn-outline-info flex-fill">회원가입</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
