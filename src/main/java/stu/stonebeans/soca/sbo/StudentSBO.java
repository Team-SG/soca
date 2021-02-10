package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.StudentVO;

public interface StudentSBO {

    // 이메일 중복 여부 체크
    boolean checkDuplicateEmail(String email);

    // 닉네임 중복 확인
    boolean checkDuplicateNickname(String nickname);

}
