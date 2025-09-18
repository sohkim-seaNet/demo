<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>로그인</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/user/login.js"></script>
    <style>
        .login-card {
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
<div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>로그인</h2>
        <a href="/board/list" class="btn btn-outline-secondary btn-sm">게시판으로</a>
    </div>

    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card login-card">
                <div class="card-header">
                    <h4 class="mb-0 text-center">환영합니다!</h4>
                </div>
                <div class="card-body">
                    <form method="post" action="/login">
                        <div class="mb-3">
                            <label for="username" class="form-label">아이디</label>
                            <input type="text" class="form-control" id="username" name="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">비밀번호</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">로그인</button>
                            <a href="/user/signup" class="btn btn-outline-secondary">회원가입</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

</div>
<%@ include file="/WEB-INF/views/inc/modalAlert.jsp" %>
</body>
</html>
