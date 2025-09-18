package com.seanet.demo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVO {

    private String userId;              // 사용자ID
    private String userPwd;             // 사용자비밀번호
    private String userNm;              // 사용자명
    private String nickname;            // 닉네임
    private String email;               // 이메일
    private LocalDateTime regDt;        // 등록일시
    private String delYn;               // 삭제여부

}
