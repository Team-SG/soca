package stu.stonebeans.soca.vo;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ScheduleVO {
    private String subjectID;
    private String email;

    @Override
    public String toString() {
        return "ScheduleVO{" +
                "subjectID='" + subjectID + '\'' +
                ", email=" + email +
                '}';
    }
}
