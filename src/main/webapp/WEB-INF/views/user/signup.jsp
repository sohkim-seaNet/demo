<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>회원가입</title>
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <script src="/js/bootstrap.bundle.min.js"></script>
    <script src="/js/common.js"></script>
    <script src="/js/signup.js" defer></script>
    <style>
        .signup-card {
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
<div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>회원가입</h2>
        <a href="/board/postList" class="btn btn-outline-secondary btn-sm">게시판으로</a>
    </div>

    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card signup-card">
                <div class="card-header">
                    <h4 class="mb-0 text-center">새 계정 만들기</h4>
                </div>
                <div class="card-body">
                    <form id="signupForm">
                        <div class="mb-3">
                            <label for="userId" class="form-label">아이디</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="userId" name="userId" required>
                                <button type="button" class="btn btn-outline-info" id="btnCheckId">중복확인</button>
                            </div>
                            <div id="userIdCheck" class="form-text"></div>
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">비밀번호</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>

                        <div class="mb-3">
                            <label for="passwordConfirm" class="form-label">비밀번호 확인</label>
                            <input type="password" class="form-control" id="passwordConfirm" name="passwordConfirm" required>
                            <div id="passwordCheck" class="form-text"></div>
                        </div>

                        <div class="mb-3">
                            <label for="nickname" class="form-label">닉네임</label>
                            <input type="text" class="form-control" id="nickname" name="nickname" required>
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">이메일</label>
                            <input type="email" class="form-control" id="email" name="email" required>
                        </div>

                        <div class="d-grid gap-2">
                            <button type="submit" class="btn btn-primary">회원가입</button>
                            <a href="/user/login" class="btn btn-outline-secondary">로그인으로</a>
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
