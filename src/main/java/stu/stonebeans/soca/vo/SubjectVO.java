package stu.stonebeans.soca.vo;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class SubjectVO {
    private String subjectID;
    private String year; // 수강년도
    private String semester; // 학기
    private String course; // 소속
    private String major; // 전공
    private String code; // 과목코드
    private String classNo; // 분반
    private String subjectNO; // 과목
    private int credit; // 학점
    private String time; // 수강시간
    private String professor; // 교수

    @Override
    public String toString() {
        return "SubjectVO{" +
                "subjectID='" + subjectID + '\'' +
                ", year=" + year +
                ", semester='" + semester + '\'' +
                ", course='" + course + '\'' +
                ", major='" + major + '\'' +
                ", code='" + code + '\'' +
                ", classNo='" + classNo + '\'' +
                ", subject='" + subjectNO + '\'' +
                ", credit=" + credit +
                ", time='" + time + '\'' +
                ", professor='" + professor + '\'' +
                '}';
    }
}
