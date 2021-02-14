package stu.stonebeans.soca.dao;

import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.SubjectVO;

import java.util.List;

@Mapper
public interface ScheduleDAO {

    // 수강년도 및 학기 데이터 가져오기
    public List<SubjectVO> getYearSemester();
}
