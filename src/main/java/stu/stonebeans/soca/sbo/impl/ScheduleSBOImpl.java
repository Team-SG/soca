package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.sbo.ScheduleSBO;

import java.util.List;

@Service
@AllArgsConstructor
public class ScheduleSBOImpl implements ScheduleSBO {

    // 수강년도 및 학기 데이터 가져오기
    @Override
    public List<String> getYearSemester() {

        return null;
    }
}
