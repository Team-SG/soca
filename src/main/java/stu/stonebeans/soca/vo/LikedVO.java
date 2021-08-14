package stu.stonebeans.soca.vo;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class LikedVO {
    private String email, subjectID, subjectNO;

    @Override
    public String toString() {
        return "LikedVO{" +
                "email='" + email + '\'' +
                ", subjectID='" + subjectID + '\'' +
                ", subjectNO='" + subjectNO + '\'' +
                '}';
    }
}
