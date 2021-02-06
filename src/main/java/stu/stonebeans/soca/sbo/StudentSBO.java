package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.StudentVO;

public interface StudentSBO {
    // 이메일 중복 여부 체크
    boolean checkDuplicateEmail(StudentVO studentVO);
}
