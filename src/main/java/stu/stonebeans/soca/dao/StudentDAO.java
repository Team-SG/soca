package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.StudentVO;

@Mapper
public interface StudentDAO {
    public StudentVO checkDuplicateEmail(StudentVO email);
}
